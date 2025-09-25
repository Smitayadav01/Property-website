import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Bed, Bath, Square } from 'lucide-react';
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
}

const Properties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchProperties();
    if (isAuthenticated) {
      fetchWishlist();
    }
  }, [isAuthenticated]);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/properties');
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Failed to fetch properties');
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

  const toggleWishlist = async (propertyId: string) => {
    if (!isAuthenticated) {
      toast.error('Please login to add properties to wishlist');
      return;
    }

    try {
      const isWishlisted = wishlist.includes(propertyId);
      
      if (isWishlisted) {
        await axios.delete(`http://localhost:5000/api/wishlist/${propertyId}`);
        setWishlist(prev => prev.filter(id => id !== propertyId));
        toast.success('Removed from wishlist');
      } else {
        await axios.post(`http://localhost:5000/api/wishlist/${propertyId}`);
        setWishlist(prev => [...prev, propertyId]);
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
          <p className="text-green-600 text-lg">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-700 mb-4">Our Properties</h1>
          <p className="text-xl text-green-600 max-w-2xl mx-auto">
            Discover your dream home from our curated collection of premium properties 
            in Vasai-Virar and Palghar district.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {property.status}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => toggleWishlist(property.id)}
                    className={`p-2 rounded-full transition-colors ${
                      wishlist.includes(property.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <Heart className="w-5 h-5" fill={wishlist.includes(property.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <div className="absolute bottom-4 right-4 bg-white px-2 py-1 rounded-lg flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700">{property.rating}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-green-700 mb-2">{property.title}</h3>
                <p className="text-green-600 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  {property.location}
                </p>

                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Bed className="w-4 h-4 text-green-500" />
                    <span>{property.bedrooms} BHK</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Bath className="w-4 h-4 text-green-500" />
                    <span>{property.bathrooms}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Square className="w-4 h-4 text-green-500" />
                    <span>{property.area}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-green-700">₹{property.price}</p>
                    <p className="text-sm text-gray-500">total price</p>
                  </div>
                  <Link
                    to={`/property/${property.id}`}
                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {properties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-green-600">No properties available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;