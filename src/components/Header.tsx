import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, User, Heart, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/properties', label: 'Properties' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="bg-white shadow-sm border-b-2 border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-green-500 p-2 rounded-xl">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-600">Vasai Properties</h1>
              <p className="text-xs text-green-500">Premium Real Estate</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-green-700 hover:text-green-500 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/wishlist"
                  className="flex items-center space-x-1 text-green-600 hover:text-green-500 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                  <span className="hidden sm:inline">Wishlist</span>
                </Link>
                
                <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg">
                  <User className="w-4 h-4 text-green-600" />
                  <span className="text-green-700 font-medium text-sm">{user?.name}</span>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-500 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>

                {user?.isAdmin && (
                  <Link
                    to="/admin"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Admin Panel
                  </Link>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors font-medium"
              >
                Login / Sign Up
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg text-green-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-green-700 hover:text-green-500 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;