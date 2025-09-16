import { User, Mail, Calendar, Edit } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  // In a real app, you would fetch this data from your authentication provider
  const user = {
    name: "Admin User",
    email: "admin@example.com",
    joinDate: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    bio: "Blog administrator and content creator.",
    avatar: "https://ui-avatars.com/api/?name=Admin+User&background=6366f1&color=fff"
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link 
          href="/dashboard" 
          className="inline-flex items-center text-sm text-gray-600 hover:text-indigo-600 mb-4"
        >
          <User className="w-4 h-4 mr-1" /> Back to Dashboard
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            <p className="text-gray-600">Manage your account settings</p>
          </div>
          <Link
            href="/dashboard/profile/edit"
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Edit className="w-4 h-4 mr-1" />
            Edit Profile
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col items-center md:flex-row md:items-start space-y-6 md:space-y-0 md:space-x-6">
            <div className="flex-shrink-0">
              <img
                className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-sm"
                src={user.avatar}
                alt={user.name}
              />
            </div>
            <div className="flex-1">
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                  <p className="text-gray-500">{user.bio}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-gray-900">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Member since</p>
                      <p className="text-gray-900">{user.joinDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/dashboard/change-password" className="text-indigo-600 hover:text-indigo-800">
                Change Password
              </Link>
            </li>
            <li>
              <Link href="/dashboard/notifications" className="text-indigo-600 hover:text-indigo-800">
                Notification Preferences
              </Link>
            </li>
            <li>
              <Link href="/dashboard/security" className="text-indigo-600 hover:text-indigo-800">
                Security Settings
              </Link>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Danger Zone</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">
                Export all of your data in a JSON file.
              </p>
              <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50">
                Export Data
              </button>
            </div>
            <div className="pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-2">
                Permanently delete your account and all of your data.
              </p>
              <button className="inline-flex items-center px-3 py-1.5 border border-red-300 text-sm font-medium rounded-lg text-red-700 bg-white hover:bg-red-50">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
