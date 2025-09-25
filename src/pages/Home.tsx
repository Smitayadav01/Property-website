import React from 'react';
import { Link } from 'react-router-dom';
import { Star, TrendingUp, Users, Award, ArrowRight } from 'lucide-react';

const Home = () => {
  const stats = [
    { number: '500+', label: 'Properties Listed', icon: TrendingUp },
    { number: '1000+', label: 'Happy Customers', icon: Users },
    { number: '10+', label: 'Years Experience', icon: Award },
    { number: '4.9', label: 'Customer Rating', icon: Star },
  ];

  return (
    <div className="bg-yellow-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-green-200 rounded-full opacity-20"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-green-300 rounded-full opacity-30"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="bg-green-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
            <Star className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-green-700 mb-6">
            Find Your
            <br />
            <span className="text-green-600">Dream Home</span>
          </h1>
          
          <p className="text-xl text-green-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover exceptional properties in Vasai-Virar with our premium real estate
            platform. <span className="font-semibold">Your perfect home awaits.</span>
          </p>
          
          <Link
            to="/properties"
            className="inline-flex items-center space-x-2 bg-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
          >
            <span>Explore Properties</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow duration-300">
                  <Icon className="w-8 h-8 text-green-500 mx-auto mb-4" />
                  <h3 className="text-4xl font-bold text-green-600 mb-2">{stat.number}</h3>
                  <p className="text-green-700 font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-green-700 mb-6">Our Story</h2>
              <div className="space-y-6 text-green-600 leading-relaxed">
                <p className="text-lg">
                  Founded in 2019, Vasai Properties emerged from a vision to
                  revolutionize the real estate experience in the rapidly growing Vasai-Virar corridor. 
                  We recognized the need for a transparent, efficient, and customer-centric approach 
                  to property transactions.
                </p>
                <p className="text-lg">
                  Today, we stand as the most trusted real estate platform in Palghar
                  district, having successfully facilitated thousands of property
                  transactions and helped families find their perfect homes and
                  investment opportunities.
                </p>
                <p className="text-lg font-semibold">
                  With over 10 years of combined experience and 500+ properties listed,
                  we continue to set new standards in real estate excellence.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Our team"
                className="rounded-xl shadow-xl w-full"
              />
              <div className="absolute inset-0 bg-green-500 opacity-10 rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <Users className="w-16 h-16 text-white mx-auto mb-8" />
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their perfect homes with Vasai Properties. 
            Start your real estate journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/properties"
              className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold hover:bg-green-50 transition-colors"
            >
              Browse Properties
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;