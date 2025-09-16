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
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    // First try to find by exact slug match in frontmatter
    const files = await fs.readdir(postsDirectory);
    
    for (const filename of files) {
      if (!filename.endsWith('.md')) continue;
      
      const filePath = path.join(postsDirectory, filename);
      const fileContents = await fs.readFile(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      // Try to match by frontmatter slug first
      if (data.slug === slug) {
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
      if (filenameWithoutExt === slug) {
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
    const filenames = await fs.readdir(postsDirectory);
    const posts = await Promise.all(
      filenames
        .filter(filename => filename.endsWith('.md'))
        .map(async (filename) => {
          const slug = filename.replace(/\.md$/, '');
          const filePath = path.join(postsDirectory, filename);
          const fileContents = await fs.readFile(filePath, 'utf8');
          const { data, content, excerpt } = matter(fileContents, {
            excerpt: true,
            excerpt_separator: '<!-- excerpt -->'
          });

          return {
            title: data.title,
            slug: data.slug || slug,
            date: data.date || new Date().toISOString(),
            excerpt: data.excerpt || excerpt || '',
            readTime: data.readTime,
            category: data.category,
            content,
          };
        })
    );

    // Sort posts by date in descending order (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

// For backward compatibility
export function getPost(slug: string): Promise<Post | null> {
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
