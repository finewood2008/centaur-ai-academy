# 内容与素材依据

## 文案

本版遵循 2026-09-15 用户确认的官网设计方案。官网正文为针对网站阅读重新整理的文案，并非整篇照搬讲稿或来信。

| 网站内容 | 工作区依据 |
| --- | --- |
| 学院理念、人机共生、创办初衷 | `docs/invitations/ai-co-creation-01/founder-letter/来自半人马AI创始人的一封信_精简版.md` |
| 保留对 AGI 的完整立场、经验与判断论证 | `docs/academy/ai-co-creation-01/三个主题演讲_核心观点与内容策划_2026-09-14.md` |
| 嘉木产品经理、连续创业者及软硬件经历；公司与学院关系 | `docs/academy/ai-co-creation-01/上午流程与讲稿_重整讨论稿_2026-09-13.md` 中保留的个人开场部分 |
| 知君、万象学习实践与自然语言创造工具 | 创始人来信与 `docs/invitations/ai-co-creation-01/课程文案.md` |
| 学院微信客服入口 | `centaurai-wanx/docs/design/academy-wecom-connection.md`，2026-09-15 已提供的链接 |

上述路径相对于父工作区。页面里的练习问题属于方向示例，不是已发生的学员成果；工具介绍以实践方向表述，不声称自动集成或额外运行能力。当前发布四篇观点文稿，包含院长来信；没有发布活动、学员案例、会员定价或未明确的服务频次。

## 视觉资产

官方 Logo 从 `docs/invitations/ai-co-creation-01/assets/centaur-logo-official.png` 原样复制，图片内容未改动。

主视觉由 built-in image_gen 单次生成，参考 `outputs/academy-xbanners-20260913/01_X展架_学院介绍_米白版.png` 中的橙蓝半人马形象。原始生成件在 `output/academy-website-assets/academy-centaur-hero.png`，网站副本位于 `public/assets/academy-centaur-hero.png`，尺寸 1448 × 1086 px。提示词、原件路径及生成说明见 `HERO_PROVENANCE.md`。

没有使用模拟活动照片、虚构肖像、虚构学员评价或虚构经营成果。
# 视觉改版补充

2026-09-15 按用户“文字太多，图形太少”的反馈精简首页与介绍页；文章正文保留。新增的 experience、co-learning、creating 为概念插画，分别表现个人积累、同伴共学、动手创造，不作为真实学院场地、活动、人物或产品界面的证明。详细提示词与来源见 `VISUAL_ASSETS.md`。


## 院长来信与 AI 主张补充 · 2026-09-15

- 嘉木在本站的身份“半人马AI学院院长、创始人”依据用户本轮直接说明；公司创始人身份在来信中作为补充保留。
- `src/content/journal/a-letter-from-jiamu.md` 以《来自半人马AI创始人的一封信_精简版.md》为底稿，保留全部正文段落；更新开头与落款身份，将首期共创班邀请改为常设学院邀请，并依据后续三讲策划补全 AGI 立场。网站版本是经上述调整的来信，不能称为未经编辑的原件。
- 学院页三条主张及首页短句，依据上述来信与《三个主题演讲_核心观点与内容策划_2026-09-14.md》整理。关于判断价值、AI 发展目标、半人马组织与私有数据的内容属于学院的分析与主张，不写成已经完成的组织改造成效或普遍研究结论。
- 首页和实践工具页共用下载按钮。实际下载目标统一在 `src/lib/site.ts` 的 `productDownloads` 配置。两个正式下载地址尚待用户提供，当前为 `null`，按钮禁用并显示“下载暂未开放”；没有以客服、首页或虚构安装包冒充下载。
