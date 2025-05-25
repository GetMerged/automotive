import React, { useState, useEffect } from 'react';
import { Sun, Moon, Car, Menu, X, Calendar, Phone, Mail, MapPin, Plus, Youtube, LogIn, LogOut } from 'lucide-react';
import { getVehicles, Vehicle, VehicleCollection, addVehicle, updateVehicle, deleteVehicle } from './component/category';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginModal } from './components/LoginModal';

const formatYouTubeUrl = (url: string): string => {
  if (!url) return '';
  
  // Handle different YouTube URL formats
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = match && match[7].length === 11 ? match[7] : null;
  
  if (!videoId) return '';
  
  // Return secure embed URL with additional parameters for better security and performance
  return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1`;
};

function AppContent() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const { isAuthenticated, logout } = useAuth();

  const emptyVehicle: Vehicle = {
    id: Date.now(),
    name: '',
    price: 0,
    isNew: true,
    imageUrl: '',
    youtubeUrl: '',
    details: '',
    seller: {
      name: '',
      experience: '',
      phone: '',
      email: '',
      location: '',
      description: ''
    }
  };
  
  const [newVehicle, setNewVehicle] = useState<Vehicle>(emptyVehicle);

  useEffect(() => {
    const data = getVehicles();
    setVehicles(data.vehicles);
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const calculateDiscountedPrice = (price: number) => {
    return (price * 0.8).toFixed(2); // 20% off
  };

  const openVehicleDetails = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setShowBooking(false);
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Booking requested for ${selectedVehicle?.name}!\nDate: ${bookingDate}\nTime: ${bookingTime}`);
    setShowBooking(false);
    setSelectedVehicle(null);
    setBookingDate('');
    setBookingTime('');
    setBookingName('');
    setBookingEmail('');
    setBookingPhone('');
  };

  const handleAddEditVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingVehicle) {
      updateVehicle({...newVehicle, id: editingVehicle.id});
      setEditingVehicle(null);
    } else {
      addVehicle(newVehicle);
    }
    
    const updatedData = getVehicles();
    setVehicles(updatedData.vehicles);
    setShowAddVehicle(false);
    setNewVehicle(emptyVehicle);
  };

  const startEditingVehicle = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setNewVehicle(vehicle);
    setShowAddVehicle(true);
  };

  const filteredVehicles = showNewOnly 
    ? vehicles.filter(v => v.isNew)
    : vehicles;

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`fixed w-full ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg z-50`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Car className="h-8 w-8" />
              <span className="font-bold text-xl">AutoMotive</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setShowNewOnly(!showNewOnly)}
                className={`px-4 py-2 rounded-lg ${showNewOnly ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                {showNewOnly ? 'Show All' : 'Show New Only'}
              </button>
              
              {/* Authentication Button */}
              {!isAuthenticated ? (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Admin Login</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setShowAddVehicle(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Add Vehicle</span>
                  </button>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </>
              )}
              
              <button
                onClick={() => setShowContactInfo(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                <Phone className="h-5 w-5" />
                <span>Contact Us</span>
              </button>
              <button 
                onClick={toggleDarkMode} 
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>

            <button 
              className="md:hidden" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className={`md:hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} py-4`}>
            <div className="container mx-auto px-4 space-y-2">
              <button
                onClick={() => {
                  setShowNewOnly(!showNewOnly);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {showNewOnly ? 'Show All' : 'Show New Only'}
              </button>
              
              {/* Mobile Authentication Button */}
              {!isAuthenticated ? (
                <button
                  onClick={() => {
                    setShowLoginModal(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 w-full py-2 px-4 text-blue-500"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Admin Login</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setShowAddVehicle(true);
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full py-2 px-4 text-blue-500"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Add Vehicle</span>
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full py-2 px-4 text-red-500"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to AutoMotive</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Discover Your Perfect Ride</p>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map(vehicle => (
            <div 
              key={vehicle.id} 
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}
            >
              <div className="relative pt-[56.25%] bg-gray-200">
                {vehicle.imageUrl && (
                  <img
                    src={vehicle.imageUrl}
                    alt={vehicle.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                {vehicle.isNew && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                    New Arrival
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{vehicle.name}</h3>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 line-through">
                      ${vehicle.price.toLocaleString()}
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      ${calculateDiscountedPrice(vehicle.price)}
                    </p>
                  </div>
                  <button 
                    onClick={() => openVehicleDetails(vehicle)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Vehicle Modal */}
        {showAddVehicle && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="text-xl font-semibold">{editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}</h3>
                <button 
                  onClick={() => {
                    setShowAddVehicle(false);
                    setEditingVehicle(null);
                    setNewVehicle(emptyVehicle);
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label="Close modal"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-6">
                <form onSubmit={handleAddEditVehicle} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">Vehicle Name</label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={newVehicle.name}
                        onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium mb-1">Price</label>
                      <input
                        id="price"
                        type="number"
                        required
                        value={newVehicle.price}
                        onChange={(e) => setNewVehicle({ ...newVehicle, price: Number(e.target.value) })}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">                    <div>
                      <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">Image URL</label>
                      <input
                        id="imageUrl"
                        type="url"
                        value={newVehicle.imageUrl || ''}
                        onChange={(e) => setNewVehicle({ ...newVehicle, imageUrl: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div>
                      <label htmlFor="youtubeUrl" className="block text-sm font-medium mb-1">YouTube URL</label>
                      <input
                        id="youtubeUrl"
                        type="url"
                        value={newVehicle.youtubeUrl || ''}
                        onChange={(e) => setNewVehicle({ ...newVehicle, youtubeUrl: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="details" className="block text-sm font-medium mb-1">Details</label>
                    <textarea
                      id="details"
                      required
                      rows={4}
                      value={newVehicle.details}
                      onChange={(e) => setNewVehicle({ ...newVehicle, details: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="sellerName" className="block text-sm font-medium mb-1">Seller Name</label>
                      <input
                        id="sellerName"
                        type="text"
                        required
                        value={newVehicle.seller.name}
                        onChange={(e) => setNewVehicle({
                          ...newVehicle,
                          seller: { ...newVehicle.seller, name: e.target.value }
                        })}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div>
                      <label htmlFor="sellerExperience" className="block text-sm font-medium mb-1">Experience</label>
                      <input
                        id="sellerExperience"
                        type="text"
                        required
                        value={newVehicle.seller.experience}
                        onChange={(e) => setNewVehicle({
                          ...newVehicle,
                          seller: { ...newVehicle.seller, experience: e.target.value }
                        })}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div>
                      <label htmlFor="sellerPhone" className="block text-sm font-medium mb-1">Phone</label>
                      <input
                        id="sellerPhone"
                        type="tel"
                        required
                        value={newVehicle.seller.phone}
                        onChange={(e) => setNewVehicle({
                          ...newVehicle,
                          seller: { ...newVehicle.seller, phone: e.target.value }
                        })}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div>
                      <label htmlFor="sellerEmail" className="block text-sm font-medium mb-1">Email</label>
                      <input
                        id="sellerEmail"
                        type="email"
                        required
                        value={newVehicle.seller.email}
                        onChange={(e) => setNewVehicle({
                          ...newVehicle,
                          seller: { ...newVehicle.seller, email: e.target.value }
                        })}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="sellerLocation" className="block text-sm font-medium mb-1">Location</label>
                    <input
                      id="sellerLocation"
                      type="text"
                      required
                      value={newVehicle.seller.location}
                      onChange={(e) => setNewVehicle({
                        ...newVehicle,
                        seller: { ...newVehicle.seller, location: e.target.value }
                      })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>

                  <div>
                    <label htmlFor="sellerDescription" className="block text-sm font-medium mb-1">Seller Description</label>
                    <textarea
                      id="sellerDescription"
                      required
                      rows={3}
                      value={newVehicle.seller.description}
                      onChange={(e) => setNewVehicle({
                        ...newVehicle,
                        seller: { ...newVehicle.seller, description: e.target.value }
                      })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      id="isNew"
                      type="checkbox"
                      checked={newVehicle.isNew}
                      onChange={(e) => setNewVehicle({ ...newVehicle, isNew: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isNew" className="ml-2 block text-sm">
                      Mark as New Arrival
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-6"
                  >
                    {editingVehicle ? 'Save Changes' : 'Add Vehicle'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Vehicle Details Modal */}
        {selectedVehicle && !showBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="text-xl font-semibold">{selectedVehicle.name}</h3>
                <div className="flex items-center space-x-2">
                  {isAuthenticated && (
                    <>
                      <button
                        onClick={() => {
                          setEditingVehicle(selectedVehicle);
                          setNewVehicle(selectedVehicle);
                          setSelectedVehicle(null);
                          setShowAddVehicle(true);
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this vehicle? This action cannot be undone.')) {
                            deleteVehicle(selectedVehicle.id);
                            setSelectedVehicle(null);
                            const updatedData = getVehicles();
                            setVehicles(updatedData.vehicles);
                          }
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </>
                  )}
                  <button 
                    onClick={() => setSelectedVehicle(null)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    aria-label="Close modal"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    {selectedVehicle.imageUrl && (
                      <img
                        src={selectedVehicle.imageUrl}
                        alt={selectedVehicle.name}
                        className="w-full h-auto rounded-lg"
                      />
                    )}
                    <div className="mt-4">
                      <h4 className="font-semibold text-lg mb-2">Pricing</h4>
                      <p className="text-gray-500 dark:text-gray-400 line-through">
                        Original Price: ${selectedVehicle.price.toLocaleString()}
                      </p>                    <p className="text-2xl font-bold text-green-600">
                      Special Offer: ${calculateDiscountedPrice(selectedVehicle.price)}
                    </p>
                  </div>

                  {selectedVehicle.youtubeUrl && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-lg mb-2">Video Preview</h4>
                      <div className="relative pt-[56.25%] bg-gray-200 rounded-lg overflow-hidden">
                        <iframe
                          src={formatYouTubeUrl(selectedVehicle.youtubeUrl)}
                          title={`${selectedVehicle.name} video`}
                          className="absolute inset-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          sandbox="allow-same-origin allow-scripts allow-presentation"
                        ></iframe>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Vehicle Details</h4>
                    <p className="text-gray-600 dark:text-gray-400">{selectedVehicle.details}</p>
                  </div>

                  {selectedVehicle.specifications && (
                      <div>
                        <h4 className="font-semibold text-lg mb-2">Specifications</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(selectedVehicle.specifications).map(([key, value]) => (
                            <div key={key} className="flex flex-col">
                              <span className="text-sm text-gray-500 dark:text-gray-400">{key}</span>
                              <span className="font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="font-semibold text-lg mb-2">Seller Information</h4>
                      <div className="space-y-2">
                        <p><span className="font-medium">Name:</span> {selectedVehicle.seller.name}</p>
                        <p><span className="font-medium">Experience:</span> {selectedVehicle.seller.experience}</p>
                        <p><span className="font-medium">Location:</span> {selectedVehicle.seller.location}</p>
                        <p className="text-gray-600 dark:text-gray-400">{selectedVehicle.seller.description}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowBooking(true)}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 flex items-center justify-center space-x-2"
                    >
                      <Calendar className="h-5 w-5" />
                      <span>Schedule Viewing</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Info Modal */}
        {showContactInfo && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg max-w-lg w-full`}>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="text-xl font-semibold">Contact Information</h3>
                <button 
                  onClick={() => setShowContactInfo(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label="Close modal"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <span>+1 (800) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <span>contact@automotive.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <span>123 Auto Drive, Car City, CC 12345</span>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-gray-600 dark:text-gray-400">
                    Our team is available Monday through Saturday, 9 AM to 6 PM.
                    Feel free to reach out with any questions about our vehicles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Booking Modal */}
        {selectedVehicle && showBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="text-xl font-semibold">{selectedVehicle.name} - Schedule Viewing</h3>
                <button 
                  onClick={() => {setSelectedVehicle(null); setShowBooking(false)}}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label="Close modal"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-6">
                <form onSubmit={handleBooking} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium mb-1">Date</label>
                      <input
                        id="date"
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium mb-1">Time</label>
                      <input
                        id="time"
                        type="time"
                        required
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name</label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={bookingName}
                        onChange={(e) => setBookingName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={bookingEmail}
                        onChange={(e) => setBookingEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={bookingPhone}
                        onChange={(e) => setBookingPhone(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mt-6"
                  >
                    Schedule Viewing
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Login Modal */}
        <LoginModal 
          isOpen={showLoginModal} 
          onClose={() => setShowLoginModal(false)} 
        />

        {/* Footer */}
        <footer className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} py-8`}>
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              © 2025 AutoMotive. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
