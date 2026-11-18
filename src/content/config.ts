import { defineCollection, z } from 'astro:content';

const schedules = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    targetClass: z.string(),
    labRoom: z.string(),
    weekNumber: z.number(),
    dateRange: z.string(),
    status: z.enum(['active', 'upcoming', 'completed']).default('active'),
    focusSkills: z.array(z.string()),
    safetyNotice: z.string().optional(),
  }),
});

const announcements = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    priority: z.enum(['high', 'medium', 'low']).default('medium'),
    targetAudience: z.string(),
    badge: z.string().optional(),
    link: z.string().optional(),
  }),
});

const ecosystem = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    url: z.string(),
    subdomain: z.string().optional(),
    isExternal: z.boolean().default(false),
    icon: z.string(),
    tag: z.string(),
    tagColor: z.string().default('blue'),
    description: z.string(),
    highlight: z.string().optional(),
    order: z.number().default(1),
  }),
});

export const collections = {
  schedules,
  announcements,
  ecosystem,
};
