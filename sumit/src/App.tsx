import React, { useState } from 'react';
import { Sun, Moon, Car, Play, Menu, X, Calendar, Phone, Mail, MapPin } from 'lucide-react';
import { categories, vehicles } from './component/category';

type Vehicle = {
  id: number;
  name: string;
  category: string;
  price: number;
  isNew: boolean;
  video: string;
  seller: {
    name: string;
    experience: string;
    phone: string;
    email: string;
    location: string;
    description: string;
  };
  details: string;
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [showContactInfo, setShowContactInfo] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const calculateDiscountedPrice = (price: number) => {
    return (price * 0.8).toFixed(2); // 20% off
  };

  const openInspectionModal = (vehicle: Vehicle) => {
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

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => setActiveCategory('all')}
                className={`hover:text-blue-500 ${activeCategory === 'all' ? 'text-blue-500' : ''}`}
              >
                All
              </button>
              {Object.entries(categories).map(([key, value]) => (
                <button 
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`hover:text-blue-500 ${activeCategory === key ? 'text-blue-500' : ''}`}
                >
                  {value}
                </button>
              ))}
              <button 
                onClick={() => setActiveCategory('new')}
                className={`hover:text-blue-500 ${activeCategory === 'new' ? 'text-blue-500' : ''}`}
              >
                New Arrivals
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowContactInfo(true)}
                className="hidden md:flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                <Phone className="h-5 w-5" />
                <span>Contact Seller</span>
              </button>
              <button 
                onClick={toggleDarkMode} 
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button 
                className="md:hidden" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className={`md:hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} py-4`}>
            <div className="container mx-auto px-4 space-y-2">
              <button 
                onClick={() => {setActiveCategory('all'); setMobileMenuOpen(false)}}
                className="block w-full text-left py-2 hover:text-blue-500"
              >
                All
              </button>
              {Object.entries(categories).map(([key, value]) => (
                <button 
                  key={key}
                  onClick={() => {setActiveCategory(key); setMobileMenuOpen(false)}}
                  className="block w-full text-left py-2 hover:text-blue-500"
                >
                  {value}
                </button>
              ))}
              <button 
                onClick={() => {setActiveCategory('new'); setMobileMenuOpen(false)}}
                className="block w-full text-left py-2 hover:text-blue-500"
              >
                New Arrivals
              </button>
              <button
                onClick={() => {setShowContactInfo(true); setMobileMenuOpen(false)}}
                className="flex items-center space-x-2 w-full py-2 text-green-500"
              >
                <Phone className="h-5 w-5" />
                <span>Contact Seller</span>
              </button>
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
          {Object.values(vehicles).flat().map(vehicle => {
            if (
              activeCategory === 'all' || 
              activeCategory === vehicle.category ||
              (activeCategory === 'new' && vehicle.isNew)
            ) {
              return (
                <div 
                  key={vehicle.id} 
                  className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}
                >
                  <div className="relative pt-[56.25%]">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={vehicle.video}
                      title={`${vehicle.name} video tour`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    {vehicle.isNew && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm z-10">
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
                        onClick={() => openInspectionModal(vehicle)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                      >
                        <Play className="h-5 w-5" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </main>

      {/* Video Inspection Modal */}
      {selectedVehicle && !showBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg max-w-4xl w-full`}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-semibold">{selectedVehicle.name} - Video Tour</h3>
              <button 
                onClick={() => setSelectedVehicle(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={selectedVehicle.video}
                title={`${selectedVehicle.name} video tour`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-lg mb-2">Vehicle Details</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{selectedVehicle.details}</p>
              <button
                onClick={() => {setShowBooking(true)}}
                className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2"
              >
                <Calendar className="h-5 w-5" />
                <span>Schedule Viewing</span>
              </button>
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
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-6"
                >
                  Schedule Viewing
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} py-8`}>
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © 2025 AutoMotive. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
