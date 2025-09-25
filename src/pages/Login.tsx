import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { login, register, adminLogin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let success;
      if (isAdminLogin) {
        success = await adminLogin(formData.phone, formData.password);
      } else if (isLogin) {
        success = await login(formData.phone, formData.password);
      } else {
        success = await register(formData);
      }

      if (success) {
        if (isAdminLogin) {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  const switchToAdmin = () => {
    setIsAdminLogin(true);
    setIsLogin(true);
    setFormData({ name: '', email: '', phone: '', password: '' });
  };

  const switchToUser = () => {
    setIsAdminLogin(false);
    setFormData({ name: '', email: '', phone: '', password: '' });
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className={`${isAdminLogin ? 'bg-red-500' : 'bg-green-500'} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
            {isAdminLogin ? <Shield className="w-8 h-8 text-white" /> : <User className="w-8 h-8 text-white" />}
          </div>
          <h2 className={`text-3xl font-bold ${isAdminLogin ? 'text-red-700' : 'text-green-700'}`}>
            {isAdminLogin ? 'Admin Login' : isLogin ? 'Sign in to your account' : 'Create your account'}
          </h2>
          
          {!isAdminLogin && (
            <p className="mt-2 text-green-600">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="font-medium text-green-500 hover:text-green-400 ml-1"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          )}
          
          <div className="mt-4 flex justify-center space-x-4">
            {!isAdminLogin ? (
              <button
                onClick={switchToAdmin}
                className="text-sm text-red-600 hover:text-red-500 font-medium flex items-center space-x-1"
              >
                <Shield className="w-4 h-4" />
                <span>Login as Admin</span>
              </button>
            ) : (
              <button
                onClick={switchToUser}
                className="text-sm text-green-600 hover:text-green-500 font-medium flex items-center space-x-1"
              >
                <User className="w-4 h-4" />
                <span>User Login</span>
              </button>
            )}
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isLogin && !isAdminLogin && (
              <>
                <div>
                  <label htmlFor="name" className="sr-only">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required={!isLogin && !isAdminLogin}
                      className="pl-10 pr-4 py-3 border border-green-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="pl-10 pr-4 py-3 border border-green-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Email (Optional)"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </>
            )}
            
            {!isLogin && !isAdminLogin && (
              <>
                <div>
                  <label htmlFor="phone" className="sr-only">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required={!isLogin && !isAdminLogin}
                      className="pl-10 pr-4 py-3 border border-green-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </>
            )}
            
            {(isLogin || isAdminLogin) && (
              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="pl-10 pr-4 py-3 border border-green-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder={isAdminLogin ? "Admin Phone Number" : "Phone Number"}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
            
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="pl-10 pr-4 py-3 border border-green-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder={isAdminLogin ? "Admin Password" : "Password"}
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${
                isAdminLogin 
                  ? 'bg-red-500 hover:bg-red-600 focus:ring-red-500' 
                  : 'bg-green-500 hover:bg-green-600 focus:ring-green-500'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                isAdminLogin ? 'Admin Login' : isLogin ? 'Sign in' : 'Sign up'
              )}
            </button>
          </div>

          <div className="text-center">
            <Link
              to="/"
              className="text-green-600 hover:text-green-500 font-medium"
            >
              Back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;