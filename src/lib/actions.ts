"use server";

import { getAllPosts, savePost, deletePost as deletePostBySlug } from "./md";

export async function getPosts() {
  return getAllPosts();
}

export async function createPost(title: string, content: string) {
  const slug = title.toLowerCase().replace(/\s+/g, "-");
  const postContent = `---
title: "${title}"
slug: "${slug}"
date: "${new Date().toISOString().split('T')[0]}"
---

${content}`;
  
  savePost(slug, postContent);
  return { success: true, slug };
}

export async function deletePost(slug: string) {
  deletePostBySlug(slug);
  return { success: true };
}