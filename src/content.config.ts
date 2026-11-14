import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const lessonSchema = z.object({
  title: z.string(),
  chapter: z.number().optional(),
  course: z.string().optional(),
  description: z.string().optional(),
  order: z.number().optional(),
});

export const collections = {
  'kien-truc-may-tinh': defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/kien-truc-may-tinh' }),
    schema: lessonSchema,
  }),
  'mang-can-ban': defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/mang-can-ban' }),
    schema: lessonSchema,
  }),
  'nang-luc-so': defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/nang-luc-so' }),
    schema: lessonSchema,
  }),
  'phan-cung-may-tinh': defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/phan-cung-may-tinh' }),
    schema: lessonSchema,
  }),
  'quan-tri-windows-linux': defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/quan-tri-windows-linux' }),
    schema: lessonSchema,
  }),
  'thiet-ke-quan-tri-lan-wan': defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/thiet-ke-quan-tri-lan-wan' }),
    schema: lessonSchema,
  }),
};
