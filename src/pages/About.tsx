import React from 'react';
import { Award, Users, TrendingUp, Shield } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Award,
      title: 'Expert Guidance',
      description: 'Our experienced team provides professional advice and support throughout your property journey.'
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'We prioritize customer satisfaction and build lasting relationships based on trust and transparency.'
    },
    {
      icon: TrendingUp,
      title: 'Market Leader',
      description: 'Leading real estate platform in Palghar district with proven track record of successful transactions.'
    },
    {
      icon: Shield,
      title: 'Trusted Service',
      description: 'Verified properties and secure transactions ensure peace of mind for all our clients.'
    }
  ];

  return (
    <div className="min-h-screen bg-yellow-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-green-700 mb-4">About Vasai Properties</h1>
          <p className="text-xl text-green-600 max-w-3xl mx-auto">
            Your trusted partner in finding the perfect home in Vasai-Virar and Palghar district
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-green-700 mb-6">Our Story</h2>
            <div className="space-y-6 text-green-600 leading-relaxed">
              <p className="text-lg">
                Founded in 2014, Vasai Properties emerged from a vision to revolutionize the 
                real estate experience in the rapidly growing Vasai-Virar corridor. We recognized 
                the need for a transparent, efficient, and customer-centric approach to property transactions.
              </p>
              <p className="text-lg">
                Starting with just a small team of passionate real estate professionals, we have 
                grown to become the most trusted name in Palghar district's property market. Our 
                commitment to excellence and customer satisfaction has driven our success.
              </p>
              <p className="text-lg">
                Today, we stand as the leading real estate platform in the region, having successfully 
                facilitated thousands of property transactions and helped families find their perfect 
                homes and investment opportunities.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Our team"
              className="rounded-xl shadow-xl w-full"
            />
            <div className="absolute inset-0 bg-green-500 opacity-10 rounded-xl"></div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">10+</div>
            <p className="text-green-700 font-medium">Years Experience</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
            <p className="text-green-700 font-medium">Properties Listed</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">1000+</div>
            <p className="text-green-700 font-medium">Happy Customers</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">4.9★</div>
            <p className="text-green-700 font-medium">Customer Rating</p>
          </div>
        </div>

        {/* Features */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-700 mb-4">Why Choose Us</h2>
            <p className="text-xl text-green-600">
              We provide exceptional service and expertise in every aspect of real estate
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <Icon className="w-12 h-12 text-green-500 mb-4" />
                  <h3 className="text-xl font-bold text-green-700 mb-3">{feature.title}</h3>
                  <p className="text-green-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mission */}
        <div className="bg-green-600 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
          <p className="text-xl text-green-100 max-w-4xl mx-auto leading-relaxed">
            To be the most trusted and innovative real estate platform in Maharashtra, 
            connecting people with their dream properties while maintaining the highest 
            standards of service, transparency, and customer satisfaction. We strive to 
            make property transactions seamless, secure, and rewarding for everyone involved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;