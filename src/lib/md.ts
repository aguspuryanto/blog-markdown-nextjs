// This file contains server-side only code and should only be imported in server components
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

// Ensure this file is only used on the server side
if (typeof window !== 'undefined') {
  throw new Error('This module can only be imported in server components');
}

export interface Post {
  title: string;
  slug: string;
  date: string;
  content: string;
  excerpt?: string;
  readTime?: string;
  category?: string;
  coverImage?: string;
  author?: string;
}

function normalizeSlug(slug: string): string {
  // Remove file extension if present
  const withoutExt = slug.replace(/\.md$/, '');
  // Convert to lowercase and replace spaces and special characters with hyphens
  return withoutExt
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function getPostBySlug(slug: string | string[]): Promise<Post | null> {
  try {
    console.log('getPostBySlug called with slug:', slug);
    // Handle both string and array of strings for slug
    const slugParts = Array.isArray(slug) ? slug : [slug];
    const normalizedSlug = slugParts.map(part => normalizeSlug(part)).join('/');
    
    // First try to find by exact slug match in frontmatter
    const files = await fs.readdir(postsDirectory);
    
    for (const filename of files) {
      if (!filename.endsWith('.md')) continue;
      
      const filePath = path.join(postsDirectory, filename);
      const fileContents = await fs.readFile(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      // Try to match by frontmatter slug first
      if (data.slug && normalizeSlug(data.slug) === normalizedSlug) {
        return {
          title: data.title,
          slug: data.slug,
          date: data.date,
          excerpt: data.excerpt || '',
          readTime: data.readTime,
          category: data.category,
          content,
        };
      }
      
      // If no match, try to match by filename (without .md extension)
      const filenameWithoutExt = path.basename(filename, '.md');
      if (normalizeSlug(filenameWithoutExt) === normalizedSlug) {
        return {
          title: data.title || filenameWithoutExt,
          slug: filenameWithoutExt,
          date: data.date || new Date().toISOString(),
          excerpt: data.excerpt || '',
          readTime: data.readTime,
          category: data.category,
          content,
        };
      }
    }
    return null;
  } catch (error) {
    console.error('Error reading post:', error);
    return null;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    console.log('Reading posts from directory:', postsDirectory);
    const filenames = await fs.readdir(postsDirectory);
    console.log('Found markdown files:', filenames);
    
    const posts = (await Promise.all(
      filenames
        .filter(filename => filename.endsWith('.md'))
        .map(async (filename): Promise<Post | null> => {
          try {
            const slug = filename.replace(/\.md$/, '');
            const filePath = path.join(postsDirectory, filename);
            console.log(`Processing file: ${filePath}`);
            
            const fileContents = await fs.readFile(filePath, 'utf8');
            const { data, excerpt, content } = matter(fileContents, {
              excerpt: true,
              excerpt_separator: '<!-- excerpt -->'
            });
            
            console.log(`File ${filename} frontmatter:`, {
              title: data.title,
              slug: data.slug,
              date: data.date
            });

            return {
              title: data.title || 'Untitled',
              slug: data.slug || slug,
              date: data.date || new Date().toISOString(),
              excerpt: data.excerpt || excerpt || '',
              readTime: data.readTime,
              category: data.category,
              content: content || '',
            };
          } catch (error) {
            console.error(`Error processing file ${filename}:`, error);
            return null;
          }
        })
    )).filter((post): post is Post => post !== null);

    // Sort posts by date in descending order (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

// For backward compatibility
export async function getPost(slug: string | string[]): Promise<Post | null> {
  return getPostBySlug(slug);
}

export function savePost(slug: string, content: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  fs.writeFile(fullPath, content, 'utf-8');
}

export function deletePost(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  fs.unlink(fullPath);
}
