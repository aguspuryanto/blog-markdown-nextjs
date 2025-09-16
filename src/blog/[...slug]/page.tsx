import { getPostBySlug } from "@/lib/md";
import ReactMarkdown from "react-markdown";
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface Props {
  params: { slug: string };
}

export default async function BlogPost({ params }: Props) {
  // Decode the slug to handle special characters
  const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug;
  const decodedSlug = decodeURIComponent(slug);
  const post = await getPostBySlug(decodedSlug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link 
        href="/blog" 
        className="inline-flex items-center text-sm text-gray-600 hover:text-indigo-600 mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to all posts
      </Link>
      
      <article className="prose lg:prose-xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <time dateTime={post.date}>
              {formatDate(post.date)}
            </time>
            {post.readTime && (
              <span>{post.readTime} read</span>
            )}
            {post.category && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                {post.category}
              </span>
            )}
          </div>
        </header>
        
        <div className="prose lg:prose-xl max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
        
        {post.excerpt && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-2">TL;DR</h3>
            <p className="text-gray-600">{post.excerpt}</p>
          </div>
        )}
      </article>
    </div>
  );
}
