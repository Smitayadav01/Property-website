import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Star, Bed, Bath, Square, MapPin, Phone, Mail } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
  rating: number;
  status: string;
  description: string;
  amenities: string[];
}

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (id) {
      fetchProperty();
      if (isAuthenticated) {
        fetchWishlist();
      }
    }
  }, [id, isAuthenticated]);

  const fetchProperty = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/properties/${id}`);
      setProperty(response.data);
    } catch (error) {
      console.error('Error fetching property:', error);
      toast.error('Property not found');
    } finally {
      setLoading(false);
    }
  };

  const fetchWishlist = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/wishlist');
      setWishlist(response.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const toggleWishlist = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add properties to wishlist');
      return;
    }

    if (!property) return;

    try {
      const isWishlisted = wishlist.includes(property.id);
      
      if (isWishlisted) {
        await axios.delete(`http://localhost:5000/api/wishlist/${property.id}`);
        setWishlist(prev => prev.filter(id => id !== property.id));
        toast.success('Removed from wishlist');
      } else {
        await axios.post(`http://localhost:5000/api/wishlist/${property.id}`);
        setWishlist(prev => [...prev, property.id]);
        toast.success('Added to wishlist');
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
      toast.error('Failed to update wishlist');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mb-4"></div>
          <p className="text-green-600 text-lg">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-green-600 text-xl">Property not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-500 text-white px-4 py-2 rounded-full font-medium">
                    {property.status}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <button
                    onClick={toggleWishlist}
                    className={`p-3 rounded-full transition-colors ${
                      wishlist.includes(property.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <Heart className="w-6 h-6" fill={wishlist.includes(property.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <div className="absolute bottom-4 right-4 bg-white px-3 py-2 rounded-lg flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-medium text-gray-700">{property.rating}</span>
                </div>
              </div>

              <div className="p-8">
                <h1 className="text-3xl font-bold text-green-700 mb-4">{property.title}</h1>
                <p className="text-green-600 mb-6 flex items-center text-lg">
                  <MapPin className="w-5 h-5 mr-2" />
                  {property.location}
                </p>

                <div className="flex items-center space-x-6 mb-8 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Bed className="w-5 h-5 text-green-500" />
                    <span className="font-medium">{property.bedrooms} BHK</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Bath className="w-5 h-5 text-green-500" />
                    <span className="font-medium">{property.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Square className="w-5 h-5 text-green-500" />
                    <span className="font-medium">{property.area}</span>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-green-700 mb-4">Description</h2>
                  <p className="text-green-600 leading-relaxed text-lg">
                    {property.description}
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-green-700 mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="bg-green-50 px-4 py-2 rounded-lg">
                        <span className="text-green-700 font-medium">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-3xl font-bold text-green-700 mb-2">₹{property.price}</h3>
              <p className="text-gray-500 mb-6">Total Price</p>
              
              <button className="w-full bg-green-500 text-white py-4 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors mb-4">
                Schedule Visit
              </button>
              
              <button className="w-full border-2 border-green-500 text-green-600 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition-colors">
                Get EMI Details
              </button>
            </div>

            {/* Contact Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-green-700 mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Phone</p>
                    <p className="text-green-600">+91 7507770244</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Mail className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Email</p>
                    <p className="text-green-600">vasaiproperty9@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Office</p>
                    <p className="text-green-600">Vasai-Virar, Palghar</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <p className="text-center text-gray-600">
                  <span className="font-medium">Office Hours:</span> 10:00 AM - 8:00 PM
                </p>
              </div>
            </div>

            {/* Experience Card */}
            <div className="bg-green-600 p-8 rounded-xl text-white">
              <h3 className="text-2xl font-bold mb-4">10+ Years Experience</h3>
              <p className="text-green-100 mb-4">
                Trusted by thousands of customers in Vasai-Virar and Palghar district.
              </p>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <div className="font-bold text-lg">500+</div>
                  <div className="text-green-200">Properties</div>
                </div>
                <div>
                  <div className="font-bold text-lg">1000+</div>
                  <div className="text-green-200">Customers</div>
                </div>
                <div>
                  <div className="font-bold text-lg">4.9★</div>
                  <div className="text-green-200">Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;