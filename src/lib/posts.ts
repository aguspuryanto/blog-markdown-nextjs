export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  date: string;
}

export let posts: Post[] = [
  {
    id: 1,
    title: "Hello World",
    slug: "hello-world",
    content: "Ini artikel pertama.",
    date: "2025-09-16"
  }
];

// Function dummy CRUD
export function createPost(post: Post) {
  posts.push(post);
}

export function deletePost(id: number) {
  posts = posts.filter((p) => p.id !== id);
}
