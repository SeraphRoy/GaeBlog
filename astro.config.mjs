// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify/functions';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.gaeblog.com',
  integrations: [
    mdx(),
    sitemap(),
    react(),
  ],
  output: 'hybrid',  // Enables server-side rendering for search
  adapter: netlify(),
  markdown: {
    // Enable syntax highlighting
    syntaxHighlight: 'prism',
    // Configure remark plugins for LaTeX support
    remarkPlugins: ['remark-math'],
    rehypePlugins: ['rehype-katex']
  }
});
