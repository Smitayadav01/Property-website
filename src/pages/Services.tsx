import React from 'react';
import { Home, Search, FileText, Users, Calculator, Shield } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Search,
      title: 'Property Search',
      description: 'Comprehensive property search with advanced filters to find your perfect home.',
      features: ['Location-based search', 'Price range filtering', 'Property type selection', 'Amenity preferences']
    },
    {
      icon: Home,
      title: 'Property Listing',
      description: 'Professional property listing service to showcase your property to potential buyers.',
      features: ['Professional photography', 'Detailed descriptions', 'Market analysis', 'Online promotion']
    },
    {
      icon: FileText,
      title: 'Documentation',
      description: 'Complete documentation support for hassle-free property transactions.',
      features: ['Legal verification', 'Document preparation', 'Registration assistance', 'Compliance check']
    },
    {
      icon: Calculator,
      title: 'Property Valuation',
      description: 'Accurate property valuation based on current market trends and analysis.',
      features: ['Market comparison', 'Professional assessment', 'Detailed reports', 'Investment advice']
    },
    {
      icon: Users,
      title: 'Consultation',
      description: 'Expert real estate consultation to guide you through every step.',
      features: ['Market insights', 'Investment guidance', 'Location analysis', 'Future prospects']
    },
    {
      icon: Shield,
      title: 'Legal Support',
      description: 'Complete legal support to ensure secure and transparent transactions.',
      features: ['Title verification', 'Legal documentation', 'Registration support', 'Dispute resolution']
    }
  ];

  return (
    <div className="min-h-screen bg-yellow-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-green-700 mb-4">Our Services</h1>
          <p className="text-xl text-green-600 max-w-3xl mx-auto">
            Comprehensive real estate services designed to make your property journey smooth and successful
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-green-700 mb-4">{service.title}</h3>
                <p className="text-green-600 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-green-600">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Process Section */}
        <div className="bg-white rounded-2xl p-12 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-700 mb-4">Our Process</h2>
            <p className="text-xl text-green-600">Simple steps to find your dream property</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="font-bold text-green-700 mb-2">Consultation</h3>
              <p className="text-green-600 text-sm">Understand your requirements and preferences</p>
            </div>
            <div className="text-center">
              <div className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="font-bold text-green-700 mb-2">Property Search</h3>
              <p className="text-green-600 text-sm">Find properties that match your criteria</p>
            </div>
            <div className="text-center">
              <div className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="font-bold text-green-700 mb-2">Site Visit</h3>
              <p className="text-green-600 text-sm">Visit and evaluate shortlisted properties</p>
            </div>
            <div className="text-center">
              <div className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
              <h3 className="font-bold text-green-700 mb-2">Documentation</h3>
              <p className="text-green-600 text-sm">Complete all legal formalities and paperwork</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-green-600 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Contact our expert team today and let us help you find your perfect property in Vasai-Virar
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+917507770244"
              className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold hover:bg-green-50 transition-colors"
            >
              Call +91 7507770244
            </a>
            <a
              href="mailto:vasaiproperty9@gmail.com"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;