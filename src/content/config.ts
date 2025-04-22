import { defineCollection, z } from 'astro:content';

// Define schema for blog posts
const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    categories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    mathjax: z.boolean().optional().default(false),
    excerpt: z.string().optional(),
  }),
});

// Define schema for pages
const pagesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    layout: z.string().optional().default('single'),
  }),
});

// Export collections
export const collections = {
  'posts': postsCollection,
  'pages': pagesCollection,
};