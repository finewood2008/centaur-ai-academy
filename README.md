# 半人马AI学院官网

面向经营者与管理者的独立学院官网。当前交付为本地可浏览版本，尚未部署或绑定正式域名。

## 本地使用

需要 Node.js 22.12 或以上、pnpm 11.7。

```sh
pnpm install --frozen-lockfile
pnpm dev
```

预览：<http://127.0.0.1:4321/>。Astro 7 的开发服务会在后台运行；使用 `pnpm exec astro dev status` 查看状态，`pnpm exec astro dev stop` 停止。

```sh
pnpm build
pnpm test:links
pnpm test:content
```

`dist/` 为静态产物。内容更新检查在临时副本中执行，不会向当前预览插入测试文章。

## 页面

| 地址 | 内容 |
| --- | --- |
| `/` | 首页 |
| `/academy/` | 学院理念、嘉木与公司关系 |
| `/learning/` | 长期共学与共创方式 |
| `/tools/` | 知君与万象的实践方向 |
| `/journal/` | 观点、活动、共创记录分类 |
| `/journal/<文稿文件名>/` | 公开内容详情 |

## 更新内容

在 `src/content/journal/` 新建 Markdown 文稿，文件名作为公开地址。已有文稿发布后保持文件名稳定。文章正文不需要重复一级标题。

```yaml
---
title: "文章标题"
category: "观点"
summary: "用于首页和列表的摘要。"
author: "半人马AI学院"
publishedAt: "2026-09-15"
draft: true
featured: false
---
```

- `category`：`观点`、`活动`、`共创记录` 三选一。
- `draft: true`：不生成公开详情，也不进入任何列表；删除该字段默认为 `false`。
- `featured: true`：进入首页精选候选，按日期从新到旧取最多 3 篇；同日按文件名排序。
- `publishedAt`：使用实际发布日，只用于日期显示与排序；本版没有定时发布。
- 可选 `cover` 为 `public/` 中图片对应的 URL，例如 `/assets/example.png`；配套 `coverAlt` 写图片说明。
- 活动必须增加下列 `event` 字段。只填写已明确的信息，确认前保持草稿。

```yaml
event:
  date: "2026 年 9 月 19 日 09:30–17:30"
  location: "填写已确认的地点"
  status: "预告"
```

活动状态允许 `预告`、`开放咨询`、`已结束`、`已取消`，由编辑根据事实更新。以上日期仅为格式示例，不是已发布活动。

更新后运行构建与站内链接检查，查看首页、列表和详情。公开部署另行安排；第一版没有 CMS、账号、支付或自动采集访客信息。

## 统一配置与素材

- `src/lib/site.ts`：品牌名称、导航、学院微信客服链接，以及 `productDownloads` 中两个产品的正式下载地址。未提供下载地址时按钮禁用；填入已确认的公开下载页或安装包 URL 后，首页和工具页同步启用。
- `src/styles/global.css`：颜色、字体、版式与响应式规则。
- `src/styles/visual.css`：图片叙事版的留白、交错大图、文章封面及手机布局。
- `public/assets/centaur-logo-official.png`：官方 Logo 的原样副本。
- `public/assets/academy-centaur-hero.png`：built-in image_gen 生成的概念艺术图，非真实活动摄影，也非新的官方标志。
- 内容与素材依据见 `CONTENT_SOURCES.md`；完整生成提示词见 `HERO_PROVENANCE.md`。
- 新增三幅概念插画保存在 `public/assets/{experience,co-learning,creating}.png`，完整提示词与来源见 `VISUAL_ASSETS.md`。图形流程使用原生 SVG；滚动入场尊重系统减少动态效果设置。

咨询按钮打开微信客服外链；复制按钮提供链接，复制失败时显示可选中的地址。网站不代发消息，不展示接待成功状态。
