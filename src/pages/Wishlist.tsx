import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Bed, Bath, Square, Trash2 } from 'lucide-react';
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

const Wishlist = () => {
  const [wishlistProperties, setWishlistProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlistProperties();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchWishlistProperties = async () => {
    try {
      // Get wishlist property IDs
      const wishlistResponse = await axios.get('http://localhost:5000/api/wishlist');
      const wishlistIds = wishlistResponse.data;

      if (wishlistIds.length === 0) {
        setWishlistProperties([]);
        setLoading(false);
        return;
      }

      // Get all properties
      const propertiesResponse = await axios.get('http://localhost:5000/api/properties');
      const allProperties = propertiesResponse.data;

      // Filter properties that are in wishlist
      const wishlistProps = allProperties.filter((prop: Property) =>
        wishlistIds.includes(prop.id)
      );

      setWishlistProperties(wishlistProps);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      toast.error('Failed to fetch wishlist');
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (propertyId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/wishlist/${propertyId}`);
      setWishlistProperties(prev => prev.filter(prop => prop.id !== propertyId));
      toast.success('Removed from wishlist');
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Failed to remove from wishlist');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-yellow-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <Heart className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-green-700 mb-4">Please Login</h1>
          <p className="text-green-600 mb-6">
            You need to login to view your wishlist and save your favorite properties.
          </p>
          <Link
            to="/login"
            className="bg-green-500 text-white px-8 py-3 rounded-full hover:bg-green-600 transition-colors font-medium"
          >
            Login / Sign Up
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mb-4"></div>
          <p className="text-green-600 text-lg">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-700 mb-4">My Wishlist</h1>
          <p className="text-xl text-green-600">
            Your favorite properties saved for future reference
          </p>
        </div>

        {wishlistProperties.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-24 h-24 text-green-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-green-700 mb-4">Your wishlist is empty</h2>
            <p className="text-green-600 mb-8 max-w-md mx-auto">
              Start browsing properties and add your favorites to create your personalized wishlist.
            </p>
            <Link
              to="/properties"
              className="bg-green-500 text-white px-8 py-4 rounded-full hover:bg-green-600 transition-colors font-medium inline-flex items-center space-x-2"
            >
              <span>Browse Properties</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistProperties.map((property) => (
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
                      onClick={() => removeFromWishlist(property.id)}
                      className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
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
        )}

        {/* Contact Section */}
        {wishlistProperties.length > 0 && (
          <div className="mt-16 bg-green-600 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Interested in These Properties?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Contact our expert team to schedule property visits or get more information about your wishlisted properties.
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
        )}
      </div>
    </div>
  );
};

export default Wishlist;