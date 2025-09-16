import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-static';

export default async function BlogList() {
  // Import dynamically to avoid including server code in client bundle
  const { getAllPosts } = await import('@/lib/md');
  const posts = await getAllPosts();
  
  if (!posts || posts.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Latest Articles</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Insights, tutorials, and updates from our team. Learn something new today.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const date = new Date(post.date);
            const formattedDate = date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
            
            return (
              <article 
                key={post.slug} 
                className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
              >
                {post.coverImage && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    {post.category && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
                        {post.category}
                      </span>
                    )}
                    <span className="text-sm text-gray-500">
                      {formattedDate}
                    </span>
                  </div>
                  
                  <Link href={`/blog/${post.slug}`} className="block flex-grow">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                  </Link>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium text-sm">
                          {post.author?.charAt(0) || 'A'}
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-700">
                          {post.author || 'Author'}
                        </span>
                      </div>
                      {post.readTime && (
                        <span className="text-sm text-gray-500">
                          {post.readTime} min read
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="absolute inset-0 z-10"
                  aria-label={`Read ${post.title}`}
                />
              </article>
            );
          })}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex rounded-md shadow">
            <Link 
              href="#" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Load More Articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
