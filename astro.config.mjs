// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.gaeblog.com',
  integrations: [
    mdx(),
    sitemap(),
    react(),
  ],
  output: 'static',  // Changed from 'server' to 'static' for simpler deployment
  // adapter: netlify(),  // Only needed for SSR
  markdown: {
    // Enable syntax highlighting
    syntaxHighlight: 'prism',
    // Configure remark plugins for LaTeX support
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex]
  },
  // Legacy features for backward compatibility
  legacy: {
    collections: true // Enable legacy collection API for layout field
  }
});
