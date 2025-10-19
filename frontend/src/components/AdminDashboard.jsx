// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0
  });
  const [filters, setFilters] = useState({
    search: '',
    course: ''
  });
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // API base URL
  const API_BASE = 'http://localhost:5000/api';

  // Configure axios with auth token (assuming token is stored elsewhere)
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  // Fetch contacts
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...filters
      };
      
      const response = await axios.get(`${API_BASE}/contacts`, { params });
      const { contacts: contactData, total } = response.data;
      setContacts(contactData);
      setPagination(prev => ({ ...prev, total }));
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Unauthorized - Please check your authentication');
      } else {
        setError('Failed to fetch contacts');
      }
    } finally {
      setLoading(false);
    }
  };

  // Delete contact
 // Delete contact
const handleDeleteContact = async (id) => {
  if (!window.confirm('Are you sure you want to delete this contact?')) return;

  try {
    setError('');
    // Axios delete with explicit headers and response handling
    const response = await axios.delete(`${API_BASE}/contacts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
      validateStatus: (status) => status < 500, // prevent axios crash
    });

    if (response.status === 200 || response.status === 204) {
      // success
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } else if (response.status === 401) {
      setError('Unauthorized - Please log in again.');
    } else {
      setError(response.data?.message || 'Failed to delete contact');
    }
  } catch (err) {
    console.error('Delete error:', err);
    setError(err.response?.data?.message || 'Failed to delete contact');
  }
};


  // View contact details
  const handleViewContact = async (id) => {
    try {
      const response = await axios.get(`${API_BASE}/contacts/${id}`);
      setSelectedContact(response.data);
      setShowModal(true);
    } catch (err) {
      setError('Failed to fetch contact details');
    }
  };

  // Update contact
  const handleUpdateContact = async (updatedData) => {
    try {
      await axios.put(`${API_BASE}/contacts/${selectedContact._id}`, updatedData);
      setShowModal(false);
      setSelectedContact(null);
      fetchContacts(); // Refresh the list
    } catch (err) {
      setError('Failed to update contact');
    }
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
  };

  // Apply filters
  const applyFilters = () => {
    fetchContacts();
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({ search: '', course: '' });
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  // Load contacts when filters or pagination changes
  useEffect(() => {
    fetchContacts();
  }, [pagination.page, filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Contact Management Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage all contact form submissions</p>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                type="text"
                placeholder="Search by name, email, phone, or message..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Course
              </label>
              <input
                type="text"
                placeholder="Enter course name..."
                value={filters.course}
                onChange={(e) => handleFilterChange('course', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={applyFilters}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200"
              >
                Apply Filters
              </button>
              <button
                onClick={clearFilters}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Contacts</h3>
            <p className="text-3xl font-bold text-gray-900">{pagination.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Current Page</h3>
            <p className="text-3xl font-bold text-gray-900">{pagination.page}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Results per Page</h3>
            <p className="text-3xl font-bold text-gray-900">{pagination.limit}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Pages</h3>
            <p className="text-3xl font-bold text-gray-900">
              {Math.ceil(pagination.total / pagination.limit)}
            </p>
          </div>
        </div>

        {/* Contacts Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading contacts...</p>
            </div>
          ) : error ? (
            <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
              <div className="text-red-700">{error}</div>
              <button
                onClick={fetchContacts}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
              >
                Retry
              </button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Course
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        City
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {contacts.map((contact) => (
                      <tr key={contact._id} className="hover:bg-gray-50 transition duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {contact.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {contact.email || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {contact.phone || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {contact.course || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {contact.city || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleViewContact(contact._id)}
                              className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-md text-xs font-medium transition duration-150"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleDeleteContact(contact._id)}
                              className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md text-xs font-medium transition duration-150"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {contacts.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-500 text-lg">No contacts found</div>
                  <p className="text-gray-400 mt-2">Try adjusting your search filters</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Pagination */}
        {pagination.total > 0 && (
          <div className="bg-white rounded-lg shadow-sm px-6 py-4 mt-6 flex items-center justify-between">
            <button
              disabled={pagination.page <= 1}
              onClick={() => handlePageChange(pagination.page - 1)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {pagination.page} of {Math.ceil(pagination.total / pagination.limit)}
            </span>
            <button
              disabled={pagination.page >= Math.ceil(pagination.total / pagination.limit)}
              onClick={() => handlePageChange(pagination.page + 1)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Contact Detail Modal */}
      {showModal && selectedContact && (
        <ContactDetailModal
          contact={selectedContact}
          onClose={() => {
            setShowModal(false);
            setSelectedContact(null);
          }}
          onUpdate={handleUpdateContact}
        />
      )}
    </div>
  );
};

// Contact Detail Modal Component
const ContactDetailModal = ({ contact, onClose, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(contact);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Contact Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        
        {editMode ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course
                </label>
                <input
                  type="text"
                  value={formData.course}
                  onChange={(e) => handleChange('course', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong className="text-gray-700">Name:</strong>
                <p className="mt-1 text-gray-900">{contact.name}</p>
              </div>
              <div>
                <strong className="text-gray-700">Email:</strong>
                <p className="mt-1 text-gray-900">{contact.email || '-'}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong className="text-gray-700">Phone:</strong>
                <p className="mt-1 text-gray-900">{contact.phone || '-'}</p>
              </div>
              <div>
                <strong className="text-gray-700">Course:</strong>
                <p className="mt-1 text-gray-900">{contact.course || '-'}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong className="text-gray-700">City:</strong>
                <p className="mt-1 text-gray-900">{contact.city || '-'}</p>
              </div>
              <div>
                <strong className="text-gray-700">State:</strong>
                <p className="mt-1 text-gray-900">{contact.state || '-'}</p>
              </div>
            </div>

            <div>
              <strong className="text-gray-700">Subject:</strong>
              <p className="mt-1 text-gray-900">{contact.subject || '-'}</p>
            </div>

            <div>
              <strong className="text-gray-700">Message:</strong>
              <div className="mt-1 p-3 bg-gray-50 rounded-md border border-gray-200">
                <p className="text-gray-900 whitespace-pre-wrap">{contact.message || '-'}</p>
              </div>
            </div>

            <div>
              <strong className="text-gray-700">Submitted:</strong>
              <p className="mt-1 text-gray-900">
                {new Date(contact.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                onClick={() => setEditMode(true)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition duration-200"
              >
                Edit Contact
              </button>
              <button
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;