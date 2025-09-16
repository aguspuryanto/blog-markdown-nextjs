'use client';

import Link from 'next/link';
import { getAllPosts } from '@/lib/md';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogPost {
  title: string;
  slug: string;
  date: string;
  excerpt?: string;
  readTime?: string;
  category?: string;
}

export default function HomePage() {
  const posts = getAllPosts() as BlogPost[];
  
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Welcome to My Blog</span>
            <span className="block text-indigo-600">Thoughts, stories and ideas</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            A collection of articles about web development, technology, and more.
          </p>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article 
              key={post.slug} 
              className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex-1 p-6 flex flex-col">
                <div className="flex-1">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <h3 className="text-xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-base text-gray-500">
                      {post.excerpt || 'Read more about this post...'}
                    </p>
                  </Link>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.date}>
                      {formatDate(post.date)}
                    </time>
                  </div>
                  {post.readTime && (
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  )}
                </div>
                <div className="mt-6">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Read more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No posts yet</h3>
            <p className="mt-1 text-gray-500">Check back later for new content!</p>
          </div>
        )}
      </div>

      {/* Newsletter CTA */}
      <div className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Stay updated</span>
            <span className="block text-indigo-200">Subscribe to our newsletter</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Subscribe
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
