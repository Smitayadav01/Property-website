import React from 'react';
import { MapPin, Phone, Mail, Clock, Users } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Vasai Property and Finance',
      details: ['Vasai-Virar, Palghar District', 'Maharashtra, India - 401201'],
      color: 'text-green-500',
      bgColor: 'bg-green-100'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91 7507770244'],
      color: 'text-blue-500',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['vasaiproperty9@gmail.com'],
      color: 'text-purple-500',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Monday - Sunday', '10:00 AM - 8:00 PM'],
      color: 'text-orange-500',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <div className="min-h-screen bg-yellow-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-green-700 mb-4">Contact Us</h1>
          <p className="text-xl text-green-600 max-w-3xl mx-auto">
            Get in touch with our property experts and start your real estate journey today
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
                <div className={`${info.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={`w-8 h-8 ${info.color}`} />
                </div>
                <h3 className="text-lg font-bold text-green-700 mb-3">{info.title}</h3>
                {info.details.map((detail, detailIndex) => (
                  <p key={detailIndex} className="text-gray-600 leading-relaxed">
                    {detail}
                  </p>
                ))}
              </div>
            );
          })}
        </div>

        {/* Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="h-96 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.8!2d72.8334386!3d19.3804687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7afa2162dc565%3A0x71004b2880652f2d!2sVasai%20Property%20%26%20Finance!5e0!3m2!1sen!2sin!4v1640995200000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Vasai Property & Finance Location"
                  className="rounded-2xl"
                ></iframe>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
                  <div className="flex items-center text-green-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm font-semibold">Vasai Property & Finance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Extra Info beside map */}
          <div className="bg-white rounded-2xl shadow-md flex items-center justify-center p-6">
            <p className="text-green-800 font-semibold text-lg text-center">
              Visit us at our office in Vasai-Virar and explore the best property deals in Palghar District!
            </p>
          </div>
        </div>

        {/* Experience & CTA Section */}
        <div className="bg-green-600 rounded-2xl p-12 text-center">
          <Users className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">
            10+ Years of Excellence in Real Estate
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            With over a decade of experience and 500+ successful property transactions, 
            we've helped thousands of families find their dream homes in Vasai-Virar and Palghar district.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+917507770244"
              className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold hover:bg-green-50 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <Phone className="w-5 h-5" />
              <span>Call Now</span>
            </a>
            <a
              href="mailto:vasaiproperty9@gmail.com"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-green-600 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <Mail className="w-5 h-5" />
              <span>Email Us</span>
            </a>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-white p-8 rounded-xl shadow-md">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-green-700 mb-6">Why Choose Vasai Properties?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                <p className="text-gray-600">Properties Listed</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">1000+</div>
                <p className="text-gray-600">Happy Customers</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">4.9★</div>
                <p className="text-gray-600">Customer Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
