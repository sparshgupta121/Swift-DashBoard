import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../services/api';
import { User } from '../types';
import { ArrowLeft, Mail, Phone, MapPin, Globe, UserIcon, Hash } from 'lucide-react';

export const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchUsers();
        setUser(userData);
      } catch (error) {
        console.error('Error loading user:', error);
      }
    };
    loadUser();
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-200 border-t-emerald-500"></div>
          <p className="text-slate-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate('/')}
          className="group mb-8 inline-flex items-center px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Dashboard
        </button>

        <div className="bg-white border-2 rounded-xl shadow-sm overflow-hidden">
          {/* Profile Header */}
          <div className="p-8 border-b border-slate-200 bg-gradient-to-r from-emerald-50 to-slate-50">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative group">
                <div className="h-24 w-24 rounded-full  border-2 border-blue-950 text-blue-950 flex items-center justify-center text-3xl font-bold transition-transform duration-200 group-hover:scale-105">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-blue-950 mb-2">
                  {user.name}
                </h1>
                <div className="flex flex-col md:flex-row items-center gap-4 text-blue-950">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-blue-950" />
                    <a 
                      href={`mailto:${user.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-850 hover:text-blue-950 hover:underline transition-colors duration-200"
                    >
                      {user.email}
                    </a>
                  </div>
                  <div className="hidden md:block h-1 w-1 bg-slate-300 rounded-full"></div>
                  <div className="flex items-center gap-2">
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="group">
                  <label className="text-sm font-medium text-slate-600 flex items-center mb-1.5">
                    <span className="bg-emerald-50 p-1.5 rounded-md text-blue-950 mr-2 group-hover:bg-blue-100 transition-colors duration-200">
                      <Hash className="h-4 w-4" />
                    </span>
                    User ID
                  </label>
                  <div className="bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-slate-700 group-hover:border-blue-200 group-hover:bg-slate-100 transition-all duration-200">
                    {user.id}
                  </div>
                </div>

                <div className="group">
                  <label className="text-sm font-medium text-slate-600 flex items-center mb-1.5">
                    <span className="bg-emerald-50 p-1.5 rounded-md text-blue-950 mr-2 group-hover:bg-blue-100 transition-colors duration-200">
                      <UserIcon className="h-4 w-4" />
                    </span>
                    Username
                  </label>
                  <div className="bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-slate-700 group-hover:border-blue-200 group-hover:bg-slate-100 transition-all duration-200">
                    {user.username}
                  </div>
                </div>

                <div className="group">
                  <label className="text-sm font-medium text-slate-600 flex items-center mb-1.5">
                  <span className="bg-emerald-50 p-1.5 rounded-md text-blue-950 mr-2 group-hover:bg-blue-100 transition-colors duration-200">
                      <Mail className="h-4 w-4" />
                    </span>
                    Email
                  </label>
                  <div className="bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-slate-700 group-hover:border-blue-200 group-hover:bg-slate-100 transition-all duration-200">
                    {user.email}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="group">
                  <label className="text-sm font-medium text-slate-600 flex items-center mb-1.5">
                  <span className="bg-emerald-50 p-1.5 rounded-md text-blue-950 mr-2 group-hover:bg-blue-100 transition-colors duration-200">
                      <Phone className="h-4 w-4" />
                    </span>
                    Phone
                  </label>
                  <div className="bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-slate-700 group-hover:border-blue-200 group-hover:bg-slate-100 transition-all duration-200">
                    {user.phone}
                  </div>
                </div>

                <div className="group">
                  <label className="text-sm font-medium text-slate-600 flex items-center mb-1.5">
                  <span className="bg-emerald-50 p-1.5 rounded-md text-blue-950 mr-2 group-hover:bg-blue-100 transition-colors duration-200">
                      <Globe className="h-4 w-4" />
                    </span>
                    Website
                  </label>
                  <div className="bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-slate-700 group-hover:border-blue-200 group-hover:bg-slate-100 transition-all duration-200">
                    <a 
                      href={`https://${user.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-850 hover:text-blue-950 hover:underline transition-colors duration-200"
                    >
                      {user.website}
                    </a>
                  </div>
                </div>

                <div className="group">
                  <label className="text-sm font-medium text-slate-600 flex items-center mb-1.5">
                  <span className="bg-emerald-50 p-1.5 rounded-md text-blue-950 mr-2 group-hover:bg-blue-100 transition-colors duration-200">
                      <MapPin className="h-4 w-4" />
                    </span>
                    Address
                  </label>
                  <div className="bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-slate-700 group-hover:border-blue-200 group-hover:bg-slate-100 transition-all duration-200">
                    <div className="space-y-1">
                      <p>{user.address.street}, {user.address.suite}</p>
                      <p>{user.address.city}, {user.address.zipcode}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;