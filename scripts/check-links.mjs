import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../dist');
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const children = await Promise.all(entries.map(entry => entry.isDirectory() ? walk(join(directory, entry.name)) : join(directory, entry.name)));
  return children.flat();
}
let checked = 0;
const errors = [];
for (const file of (await walk(root)).filter(file => file.endsWith('.html'))) {
  const document = await readFile(file, 'utf8');
  assert.match(document, /<html[^>]*lang="zh-CN"/);
  assert.match(document, /<title>[^<]+<\/title>/);
  assert.match(document, /name="description"/);
  assert.equal((document.match(/<h1[\s>]/g) || []).length, 1, file);
  for (const [, value] of document.matchAll(/(?:href|src)="([^"\s]+)"/g)) {
    if (!value.startsWith('/')) continue;
    const pathname = decodeURIComponent(value.split(/[?#]/)[0]);
    let target = join(root, pathname);
    try {
      if ((await stat(target)).isDirectory()) target = join(target, 'index.html');
      await stat(target);
      checked++;
    } catch { errors.push(`${file.replace(root, '')}: ${value}`); }
  }
}
assert.deepEqual(errors, [], errors.join('\n'));
console.log(`PASS: ${checked} 个站内链接与资源引用，页面标题、说明与主标题完整。`);
