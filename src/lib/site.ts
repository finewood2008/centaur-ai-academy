import { getCollection } from 'astro:content';

export const site = {
  name: '半人马AI学院',
  english: 'CENTAUR AI ACADEMY',
  contactUrl: 'https://work.weixin.qq.com/kfid/kfc472df2b7db14c36e',
  description: '面向经营者与管理者的长期共学与共创学院。把你的经验、判断和真实问题，与 AI 的能力连接起来。',
};

export const navigation = [
  { href: '/academy/', label: '了解学院' },
  { href: '/learning/', label: '共学共创' },
  { href: '/tools/', label: '实践工具' },
  { href: '/journal/', label: '观点与动态' },
];

// Only fill these with confirmed public product download destinations.
export const productDownloads: Record<'zhijun' | 'wanxiang', { name: string; url: string | null }> = {
  zhijun: { name: '知君', url: null },
  wanxiang: { name: '万象', url: null },
};

export async function publishedEntries() {
  const entries = await getCollection('journal', ({ data }) => !data.draft);
  return entries.sort((a, b) => b.data.publishedAt.localeCompare(a.data.publishedAt) || a.id.localeCompare(b.id));
}

export function dateLabel(value: string) {
  return value.replaceAll('-', '.');
}
