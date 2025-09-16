import Link from 'next/link';
import { getAllPosts } from '@/lib/md';
import { notFound } from 'next/navigation';

// This function runs at build time to generate static paths
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: [post.slug],
  }));
}

export default async function BlogList() {
  const posts = await getAllPosts();
  
  if (!posts || posts.length === 0) {
    notFound();
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Blog Posts</h1>
      <ul className="space-y-6">
        {posts.map((post) => {
          const date = new Date(post.date);
          const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
          
          return (
            <li key={post.slug} className="border-b border-gray-200 pb-6 last:border-0">
              <Link href={`/blog/${post.slug}`} className="block group">
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {post.title}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {formattedDate}
                  {post.readTime && ` · ${post.readTime}`}
                </p>
                {post.excerpt && (
                  <p className="mt-2 text-gray-600">
                    {post.excerpt}
                  </p>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
