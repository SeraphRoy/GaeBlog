import { defineCollection, z } from 'astro:content';

// Define schema for blog posts that's compatible with Jekyll and Netlify CMS frontmatter
const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    // Accept both Date objects and date strings
    date: z.union([
      z.date(),
      z.string().transform((val) => new Date(val))
    ]),
    // Accept various formats for categories from Jekyll and Netlify CMS
    categories: z.union([
      z.array(z.string()),
      z.string().transform((val) => [val]),
      z.array(z.object({ category: z.string() }))
        .transform((arr) => arr.map(item => item.category))
    ]).optional().default([]),
    // Accept various formats for tags from Jekyll and Netlify CMS
    tags: z.union([
      z.array(z.string()),
      z.string().transform((val) => [val]),
      z.array(z.object({ tag: z.string() }))
        .transform((arr) => arr.map(item => item.tag))
    ]).optional().default([]),
    // Accept both boolean and string values for mathjax
    mathjax: z.union([
      z.boolean(),
      z.string().transform((val) => val === 'true')
    ]).optional().default(false),
    // Optional fields from Jekyll
    excerpt: z.string().optional(),
    layout: z.string().optional(),
    permalink: z.string().optional(),
    published: z.boolean().optional(),
    comments: z.boolean().optional(),
  }),
});

// Define schema for pages
const pagesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    layout: z.string().optional().default('single'),
    permalink: z.string().optional(),
  }),
});

// Export collections
export const collections = {
  'posts': postsCollection,
  'pages': pagesCollection,
};