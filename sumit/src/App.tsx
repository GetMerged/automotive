import React, { useState, useEffect } from 'react';
import { getVehicles, Vehicle, addVehicle, updateVehicle, deleteVehicle } from './components/category';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginModal } from './components/LoginModal';
import Header from './components/Header';
import Footer from './components/Footer';
import VehicleCard from './components/VehicleCard';
import AddEditVehicleModal from './components/AddEditVehicleModal';
import BookingModal from './components/BookingModal';
import VehicleDetailsModal from './components/VehicleDetailsModal';
import ContactInfoModal from './components/ContactInfoModal';

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

  const filteredVehicles = showNewOnly 
    ? vehicles.filter(v => v.isNew)
    : vehicles;

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header 
        darkMode={darkMode}
        showNewOnly={showNewOnly}
        mobileMenuOpen={mobileMenuOpen}
        isAuthenticated={isAuthenticated}
        toggleDarkMode={toggleDarkMode}
        setShowNewOnly={setShowNewOnly}
        setMobileMenuOpen={setMobileMenuOpen}
        setShowLoginModal={setShowLoginModal}
        setShowAddVehicle={setShowAddVehicle}
        setShowContactInfo={setShowContactInfo}
        logout={logout}
      />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to AutoMotive</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Discover Your Perfect Ride</p>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map(vehicle => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              darkMode={darkMode}
              onViewDetails={(vehicle) => {
                setSelectedVehicle(vehicle);
                setShowBooking(false);
              }}
            />
          ))}
        </div>

        {/* Modals */}
        <AddEditVehicleModal
          darkMode={darkMode}
          showAddVehicle={showAddVehicle}
          editingVehicle={editingVehicle}
          newVehicle={newVehicle}
          emptyVehicle={emptyVehicle}
          setShowAddVehicle={setShowAddVehicle}
          setEditingVehicle={setEditingVehicle}
          setNewVehicle={setNewVehicle}
          handleAddEditVehicle={handleAddEditVehicle}
        />

        <VehicleDetailsModal
          darkMode={darkMode}
          selectedVehicle={selectedVehicle!}
          showBooking={showBooking}
          isAuthenticated={isAuthenticated}
          setEditingVehicle={setEditingVehicle}
          setNewVehicle={setNewVehicle}
          setSelectedVehicle={setSelectedVehicle}
          setShowBooking={setShowBooking}
          setShowAddVehicle={setShowAddVehicle}
          deleteVehicle={deleteVehicle}
          setVehicles={setVehicles}
          getVehicles={getVehicles}
        />

        <BookingModal
          darkMode={darkMode}
          selectedVehicle={selectedVehicle!}
          showBooking={showBooking}
          bookingDate={bookingDate}
          bookingTime={bookingTime}
          bookingName={bookingName}
          bookingEmail={bookingEmail}
          bookingPhone={bookingPhone}
          setSelectedVehicle={setSelectedVehicle}
          setShowBooking={setShowBooking}
          setBookingDate={setBookingDate}
          setBookingTime={setBookingTime}
          setBookingName={setBookingName}
          setBookingEmail={setBookingEmail}
          setBookingPhone={setBookingPhone}
          handleBooking={handleBooking}
        />

        <ContactInfoModal
          darkMode={darkMode}
          showContactInfo={showContactInfo}
          setShowContactInfo={setShowContactInfo}
        />

        <LoginModal 
          isOpen={showLoginModal} 
          onClose={() => setShowLoginModal(false)} 
        />

        <Footer darkMode={darkMode} />
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
