import assert from 'node:assert/strict';
import { cp, mkdtemp, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';

const project = resolve(import.meta.dirname, '..');
const require = createRequire(import.meta.url);
const astroManifest = require.resolve('astro/package.json');
const astroPackage = JSON.parse(await readFile(astroManifest, 'utf8'));
const astroCli = join(dirname(astroManifest), astroPackage.bin.astro);
const sandbox = await mkdtemp(join(tmpdir(), 'centaur-academy-content-'));
const fixturePath = join(sandbox, 'src/content/journal/content-pipeline-check.md');
const html = path => readFile(join(sandbox, 'dist', path), 'utf8');
function build() {
  const result = spawnSync(process.execPath, [astroCli, 'build'], { cwd: sandbox, encoding: 'utf8', env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' } });
  assert.equal(result.status, 0, result.stdout + result.stderr);
}
const fixture = (title, body, draft = false) => `---\ntitle: "${title}"\ncategory: "观点"\nsummary: "内容维护验证"\nauthor: "测试"\npublishedAt: "2026-09-16"\nfeatured: true\ndraft: ${draft}\n---\n\n${body}\n`;

try {
  for (const entry of ['src', 'public', 'astro.config.mjs', 'tsconfig.json', 'package.json']) {
    await cp(join(project, entry), join(sandbox, entry), { recursive: true });
  }
  await symlink(join(project, 'node_modules'), join(sandbox, 'node_modules'), 'dir');
  await writeFile(fixturePath, fixture('新增文稿验证标题', '新增文稿验证正文'));
  await writeFile(join(sandbox, 'src/content/journal/event-pipeline-check.md'), '---\ntitle: "活动格式验证"\ncategory: "活动"\nsummary: "仅用于隔离测试"\npublishedAt: "2026-09-15"\nevent:\n  date: "测试日期"\n  location: "测试地点"\n  status: "预告"\n---\n活动正文。\n');
  await writeFile(join(sandbox, 'src/content/journal/record-pipeline-check.md'), '---\ntitle: "共创记录格式验证"\ncategory: "共创记录"\nsummary: "仅用于隔离测试"\npublishedAt: "2026-09-15"\n---\n共创正文。\n');
  build();
  assert.match(await html('index.html'), /新增文稿验证标题/);
  assert.match(await html('journal/index.html'), /新增文稿验证标题/);
  assert.match(await html('journal/content-pipeline-check/index.html'), /新增文稿验证正文/);
  assert.match(await html('journal/event-pipeline-check/index.html'), /测试地点/);
  assert.match(await html('journal/record-pipeline-check/index.html'), /共创正文/);
  console.log('PASS: 新增文稿出现在首页、列表与详情；活动与共创记录可生成。');

  await writeFile(fixturePath, fixture('修改文稿验证标题', '修改文稿验证正文'));
  build();
  for (const page of ['index.html', 'journal/index.html', 'journal/content-pipeline-check/index.html']) {
    const output = await html(page);
    assert.match(output, /修改文稿验证标题/);
    assert.doesNotMatch(output, /新增文稿验证标题/);
  }
  assert.match(await html('journal/content-pipeline-check/index.html'), /修改文稿验证正文/);
  console.log('PASS: 修改文稿后，首页、列表与详情同步更新。');

  await writeFile(fixturePath, fixture('修改文稿验证标题', '修改文稿验证正文', true));
  build();
  for (const page of ['index.html', 'journal/index.html']) assert.doesNotMatch(await html(page), /修改文稿验证标题/);
  assert.equal(existsSync(join(sandbox, 'dist/journal/content-pipeline-check/index.html')), false);
  console.log('PASS: 转为草稿后，首页、列表与公开详情均移除。');
} finally {
  await rm(sandbox, { recursive: true, force: true });
}
