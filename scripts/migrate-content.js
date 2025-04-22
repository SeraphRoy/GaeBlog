// scripts/migrate-content.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import matter from 'gray-matter';

// Get current file directory with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Source and destination directories
const sourcePostsDir = path.resolve(__dirname, '../../SeraphRoy.github.io/_posts');
const destPostsDir = path.resolve(__dirname, '../src/content/posts');
const sourcePagesDir = path.resolve(__dirname, '../../SeraphRoy.github.io/_pages');
const destPagesDir = path.resolve(__dirname, '../src/content/pages');

// Ensure destination directories exist
if (!fs.existsSync(destPostsDir)) {
  fs.mkdirSync(destPostsDir, { recursive: true });
}
if (!fs.existsSync(destPagesDir)) {
  fs.mkdirSync(destPagesDir, { recursive: true });
}

// Migrate blog posts
fs.readdirSync(sourcePostsDir).forEach(file => {
  if (!file.endsWith('.md')) return;
  
  const filePath = path.join(sourcePostsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Parse frontmatter
  const { data, content: markdown } = matter(content);
  
  // Create new frontmatter with Astro's format
  const newData = {
    title: data.title || '',
    date: data.date || new Date(),
    categories: data.categories || [],
    tags: data.tags || [],
    mathjax: !!data.mathjax,
  };
  
  // Create new content
  const newContent = `---
${Object.entries(newData)
  .map(([key, value]) => {
    if (Array.isArray(value)) {
      return `${key}: ${JSON.stringify(value)}`;
    } else if (value instanceof Date) {
      return `${key}: "${value.toISOString()}"`;
    } else {
      return `${key}: ${typeof value === 'string' ? `"${value}"` : value}`;
    }
  })
  .join('\n')}
---

${markdown}`;
  
  // Write to new file
  fs.writeFileSync(path.join(destPostsDir, file), newContent);
  console.log(`✓ Migrated post: ${file}`);
});

// Migrate pages (similar approach as posts)
fs.readdirSync(sourcePagesDir).forEach(file => {
  if (!file.endsWith('.md')) return;
  
  const filePath = path.join(sourcePagesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Parse frontmatter
  const { data, content: markdown } = matter(content);
  
  // Create new frontmatter with Astro's format
  const newData = {
    title: data.title || '',
    layout: data.layout || 'single',
  };
  
  // Create new content
  const newContent = `---
${Object.entries(newData)
  .map(([key, value]) => {
    return `${key}: "${value}"`;
  })
  .join('\n')}
---

${markdown}`;
  
  // Write to new file
  fs.writeFileSync(path.join(destPagesDir, file), newContent);
  console.log(`✓ Migrated page: ${file}`);
});

console.log('Migration complete!');