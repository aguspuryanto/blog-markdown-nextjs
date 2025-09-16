import Link from "next/link";
import { getPosts, deletePost } from "@/lib/actions";
import { PlusCircle, Pencil, Trash2, FileText } from "lucide-react";

export default async function DashboardHome() {
  const posts = await getPosts();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your blog.</p>
        </div>
        <Link 
          href="/dashboard/posts/" 
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          New Post
        </Link>
      </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Recent Posts</h2>
          </div>
          
          {posts.length === 0 ? (
            <div className="p-8 text-center">
              <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No posts yet</h3>
              <p className="mt-1 text-gray-500">Get started by creating a new post.</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {posts.map((post) => (
                <li key={post.slug} className="hover:bg-gray-50 transition-colors">
                  <div className="px-6 py-4 flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {post.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="ml-4 flex space-x-3">
                      <Link 
                        href={`/dashboard/posts/edit/${post.slug}`}
                        className="text-gray-400 hover:text-indigo-600 p-2 rounded-full hover:bg-indigo-50"
                        title="Edit post"
                      >
                        <Pencil className="w-5 h-5" />
                      </Link>
                      <form action={async () => { "use server"; await deletePost(post.slug); }}>
                        <button 
                          type="submit" 
                          className="text-gray-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50"
                          title="Delete post"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </form>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Total Posts</h3>
            <p className="text-3xl font-bold text-indigo-600">{posts.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Last Updated</h3>
            <p className="text-gray-600">
              {posts.length > 0 
                ? new Date(posts[0].date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                : 'No posts yet'}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Quick Actions</h3>
            <div className="space-y-2">
              <Link href="/dashboard/posts/" className="flex items-center text-indigo-600 hover:text-indigo-800">
                <PlusCircle className="w-4 h-4 mr-2" />
                <span>Create New Post</span>
              </Link>
              <Link href="/blog" className="flex items-center text-indigo-600 hover:text-indigo-800">
                <FileText className="w-4 h-4 mr-2" />
                <span>View Blog</span>
              </Link>
            </div>
          </div>
      </div>
    </div>
  );
}
