import React, { useState, useEffect, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BellIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import axios from 'axios';

const Navbar = () => {
  const [isOpenState, setIsOpenState] = useState(false);
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/32');
  const [loading, setLoading] = useState(true); 
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const response = await axios.get('http://localhost:5000/api/profile', {
            headers: {
              'Authorization': ` ${token}`,
            },
          });
          setProfileImage(response.data.profile.profileImage || 'https://via.placeholder.com/32');
        }
      } catch (err) {
        console.error('Error fetching profile image:', err);
      } finally {
        setLoading(false);
      }
    };

    if (authState.isAuthenticated) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [authState.isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <nav className="bg-white border-t border-b border-green-600 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12 md:h-16">
          {/* Logo and Mobile Menu Button Section */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link to="/" className="text-green-600 text-2xl font-bold">
              CRS
            </Link>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpenState(!isOpenState)}
                className="p-2 text-gray-500 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <span className="sr-only">Open main menu</span>
                {isOpenState ? (
                  <XMarkIcon className="block h-6 w-6" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link to="/homePage" className="text-gray-900 text-base font-medium hover:text-green-600">
              Dashboard
            </Link>
            <Link to="/about" className="text-gray-900 text-base font-medium hover:text-green-600">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-900 text-base font-medium hover:text-green-600">
              Contact Us
            </Link>
            <Link to="/readMe" className="text-gray-900 text-base font-medium hover:text-green-600">
              Read Me
            </Link>
            {authState.isAuthenticated && authState.userRole === 'admin' && (
              <Link to="/adminreadme" className="text-gray-900 text-base font-medium hover:text-green-600">
                Add Event
              </Link>
            )}
            {/* code for adminreadme extra */}
              {/* <Link to="/adminreadme" className="text-gray-900 text-base font-medium hover:text-green-600">
                Add Event
              </Link> */}
          
            {authState.isAuthenticated && authState.userRole === 'admin' && (
              <Link to="/admin-contact" className="text-gray-900 text-base font-medium hover:text-green-600">
                Admin Dashboard
              </Link>
            )}
            {authState.isAuthenticated && (
              <Link to="/recommendationsComponent" className="text-gray-900 text-base font-medium hover:text-green-600">
                Get Recommendation 
              </Link>
            )}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {authState.isAuthenticated ? (
              <>
                <button className="p-2 rounded-full text-gray-500 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <BellIcon className="h-6 w-6" />
                </button>

                <Menu as="div" className="relative">
                  <div>
                    <Menu.Button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-green-500">
                      <img
                        className="h-11 w-11 rounded-full"
                        src={profileImage}
                        alt="User"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={`${active ? 'bg-gray-100' : ''} block px-4 w-full py-2 text-sm text-gray-700`}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpenState && (
        <div className="md:hidden bg-white border-t border-b border-green-600 shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/homePage" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-green-100">
              Dashboard
            </Link>
            {authState.isAuthenticated && (
              <Link to="/recommendationsComponent" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-green-100">
                Get Recommendation 
              </Link>
            )}
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-green-100">
              About Us
            </Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-green-100">
              Contact Us
            </Link>
            <Link to="/readMe" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-green-100">
              Read Me
            </Link>
            
            {authState.isAuthenticated && authState.userRole === 'admin' && (
              <Link to="/admin-contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-green-100">
                Admin Dashboard
              </Link>
            )}
            {authState.isAuthenticated && authState.userRole === 'admin' && (
              <Link to="/adminreadme" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-green-100">
                Add Event
              </Link>
            )}
          </div>
          {authState.isAuthenticated ? (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-5">
                <div className="shrink-0">
                  <img className="h-11 w-11 rounded-full" src={profileImage} alt="User" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{authState.userName}</div>
                  <div className="text-sm font-medium text-gray-500">{authState.userEmail}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-green-100">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full px-3 text-center py-2 rounded-md text-base font-medium text-gray-900 hover:bg-green-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <div className="py-3 border-t border-gray-200">
              <Link
                to="/login"
                className="block w-full text-center bg-green-600 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-green-700"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
