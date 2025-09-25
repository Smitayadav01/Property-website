import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
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

const AdminPanel = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    type: 'Apartment',
    bedrooms: 1,
    bathrooms: 1,
    area: '',
    image: '',
    rating: 4.5,
    status: 'For sale',
    description: '',
    amenities: ''
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  // Check if user is admin
  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access the admin panel.</p>
        </div>
      </div>
    );
  }

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const propertyData = {
      ...formData,
      amenities: formData.amenities.split(',').map(item => item.trim()).filter(item => item)
    };

    try {
      if (editingProperty) {
        await axios.put(`http://localhost:5000/api/properties/${editingProperty.id}`, propertyData);
        toast.success('Property updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/properties', propertyData);
        toast.success('Property added successfully');
      }

      setShowForm(false);
      setEditingProperty(null);
      resetForm();
      fetchProperties();
    } catch (error) {
      console.error('Error saving property:', error);
      toast.error('Failed to save property');
    }
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setFormData({
      ...property,
      amenities: property.amenities.join(', ')
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await axios.delete(`http://localhost:5000/api/properties/${id}`);
        toast.success('Property deleted successfully');
        fetchProperties();
      } catch (error) {
        console.error('Error deleting property:', error);
        toast.error('Failed to delete property');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      location: '',
      price: '',
      type: 'Apartment',
      bedrooms: 1,
      bathrooms: 1,
      area: '',
      image: '',
      rating: 4.5,
      status: 'For sale',
      description: '',
      amenities: ''
    });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProperty(null);
    resetForm();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mb-4"></div>
          <p className="text-green-600 text-lg">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-green-700 mb-2">Admin Panel</h1>
            <p className="text-green-600">Manage properties and listings</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Property</span>
          </button>
        </div>

        {/* Property Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-green-700">
                    {editingProperty ? 'Edit Property' : 'Add New Property'}
                  </h2>
                  <button
                    onClick={handleCancel}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="Apartment">Apartment</option>
                        <option value="Villa">Villa</option>
                        <option value="House">House</option>
                        <option value="Plot">Plot</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="For sale">For Sale</option>
                        <option value="For rent">For Rent</option>
                        <option value="Sold">Sold</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bedrooms
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.bedrooms}
                        onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bathrooms
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.bathrooms}
                        onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Area (sq ft)
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rating
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        step="0.1"
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="https://images.pexels.com/... (Leave empty for default image)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amenities (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.amenities}
                      onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Parking, Security, Gym, Swimming Pool"
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center justify-center space-x-2"
                    >
                      <Save className="w-5 h-5" />
                      <span>{editingProperty ? 'Update' : 'Add'} Property</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium flex items-center justify-center space-x-2"
                    >
                      <X className="w-5 h-5" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Properties Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {properties.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-12 h-12 rounded-lg object-cover mr-4"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{property.title}</div>
                          <div className="text-sm text-gray-500">{property.bedrooms} BHK • {property.area}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {property.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      ₹{property.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {property.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {property.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(property)}
                          className="text-blue-600 hover:text-blue-500 p-1 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(property.id)}
                          className="text-red-600 hover:text-red-500 p-1 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {properties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-green-600">No properties found. Add your first property!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;