import { getPostBySlug } from "@/lib/md";
import ReactMarkdown from "react-markdown";
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface Props {
  params: { slug: string | string[] };
}

export async function generateStaticParams() {
  const { getAllPosts } = await import('@/lib/md');
  const posts = await getAllPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: Props) {
  let post;
  
  try {
    // Get the slug as a string (it might be an array from the URL)
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
    console.log('Fetching post with slug:', slug);
    
    post = await getPostBySlug(slug);
    
    if (!post) {
      console.error('Post not found for slug:', slug);
      notFound();
    }
  } catch (error) {
    console.error('Error loading post:', error);
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <Link 
          href="/blog" 
          className="group inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
          Back to all articles
        </Link>
        
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
          <div className="p-8 md:p-10 lg:p-12">
            <header className="mb-10">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.category && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
                    {post.category}
                  </span>
                )}
                <span className="text-sm text-gray-500">
                  {formatDate(post.date)}
                  {post.readTime && (
                    <span className="mx-2">•</span>
                  )}
                  {post.readTime && (
                    <span>{post.readTime} min read</span>
                  )}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
                {post.title}
              </h1>
            </header>
            
            <div className="prose prose-indigo prose-lg max-w-none">
              {post.coverImage && (
                <div className="mb-10 -mx-8 md:-mx-10 lg:-mx-12">
                  <img 
                    src={post.coverImage} 
                    alt={post.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
              
              <div className="prose prose-indigo prose-lg max-w-none">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
            </div>
            
            {post.excerpt && (
              <div className="mt-12 p-6 bg-indigo-50 rounded-xl border border-indigo-100">
                <div className="flex items-center mb-3">
                  <svg className="h-5 w-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900">Key Takeaways</h3>
                </div>
                <p className="text-gray-700">{post.excerpt}</p>
              </div>
            )}
            
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xl">
                  {post.author?.charAt(0) || 'A'}
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-900">{post.author || 'Author'}</p>
                  <p className="text-sm text-gray-500">Published on {formatDate(post.date)}</p>
                </div>
              </div>
            </div>
          </div>
        </article>
        
        <div className="mt-12 text-center">
          <Link 
            href="/blog" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to all articles
          </Link>
        </div>
      </div>
    </div>
  );
}
