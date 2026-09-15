import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['观点', '活动', '共创记录']),
    summary: z.string(),
    author: z.string().default('半人马AI学院'),
    publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    event: z.object({
      date: z.string(),
      location: z.string(),
      status: z.enum(['预告', '开放咨询', '已结束', '已取消']),
    }).optional(),
  }).refine((entry) => entry.category !== '活动' || !!entry.event, {
    message: '活动必须填写 event.date、event.location 和 event.status。',
  }),
});

export const collections = { journal };
