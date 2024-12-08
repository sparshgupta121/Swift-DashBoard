import { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, User, ChevronDown } from 'lucide-react';
import { fetchUsers } from '../services/api';
import type { User as UserType } from '../types';
import img from "../../img.png"

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const userData = await fetchUsers();
      setUser(userData);
    };
    loadUser();
  }, []);

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <nav className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <button onClick={handleLogoClick} className="flex items-center gap-2 focus:outline-none">
                <img
                  src={img}
                  alt="Logo"
                  className="h-10 w-24"
                />
              </button>
            </div>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <Link
                to="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location.pathname === '/'
                    ? 'border-emerald-500 text-white'
                    : 'border-transparent text-gray-300 hover:border-gray-300 hover:text-gray-100'
                }`}
              >
                <LayoutDashboard className="w-5 h-5 mr-2" />
                Dashboard
              </Link>
              <Link
                to="/profile"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location.pathname === '/profile'
                    ? 'border-emerald-500 text-white'
                    : 'border-transparent text-gray-300 hover:border-gray-300 hover:text-gray-100'
                }`}
              >
                <User className="w-5 h-5 mr-2" />
                Profile
              </Link>
            </div>
          </div>

          {user && (
            <div className="flex items-center">
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 max-w-xs rounded-full"
                >
                  <div className="h-8 w-8 rounded-full bg-white text-slate-900 flex items-center justify-center font-semibold text-sm">
                    {user.name[0].toUpperCase()}
                    {user.name[1].toUpperCase()}
                  </div>
                  <span className="hidden md:flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {user.name}
                    </span>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </span>
                </button>

                {isDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

