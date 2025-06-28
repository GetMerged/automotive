import { Vehicle } from '../types/Vehicle';
import { X, Calendar } from 'lucide-react';

interface VehicleDetailsModalProps {
  darkMode: boolean;
  selectedVehicle: Vehicle;
  showBooking: boolean;
  isAuthenticated: boolean;
  setEditingVehicle: (vehicle: Vehicle | null) => void;
  setNewVehicle: (vehicle: Omit<Vehicle, 'id'>) => void;
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
  setShowBooking: (show: boolean) => void;
  setShowAddVehicle: (show: boolean) => void;
  deleteVehicle: (id: string) => Promise<void>;
  setVehicles?: (vehicles: Vehicle[]) => void;
  getVehicles?: () => Promise<Vehicle[]> | Vehicle[];
}

const VehicleDetailsModal = ({
  darkMode,
  selectedVehicle,
  showBooking,
  isAuthenticated,
  setEditingVehicle,
  setNewVehicle,
  setSelectedVehicle,
  setShowBooking,
  setShowAddVehicle,
  deleteVehicle,
  setVehicles,
  getVehicles
}: VehicleDetailsModalProps) => {
  const formatYouTubeUrl = (url: string): string => {
    if (!url) return '';
    
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[7].length === 11 ? match[7] : null;
    
    if (!videoId) return '';
    
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1`;
  };

  const formatPrice = (price: string, currency: 'USD' | 'INR' = 'USD') => {
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) return price;
    if (currency === 'INR') {
      // Use ₹ symbol and Indian formatting
      return `₹${numericPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    // Default to USD
    return `$${numericPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  if (!selectedVehicle || showBooking) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 border-gray-600' : 'bg-gradient-to-br from-blue-50 via-white to-green-50 border-blue-200'} rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border-2 transform transition-all duration-300 hover:shadow-3xl`}>
        
        {/* Header */}
        <div className={`p-6 border-b ${darkMode ? 'border-gray-700 bg-gradient-to-r from-blue-900/20 to-green-900/20' : 'border-gray-200 bg-gradient-to-r from-blue-500/10 to-green-400/10'} rounded-t-2xl`}>
          <div className="flex justify-between items-center">
            <div>
              <h3 className={`text-3xl font-extrabold ${darkMode ? 'text-blue-300' : 'text-blue-700'} tracking-tight drop-shadow-lg`}>
                {selectedVehicle.name}
              </h3>
              <div className="flex items-center mt-2">
                <span className={`text-4xl font-black ${darkMode ? 'text-green-400' : 'text-green-600'} drop-shadow-lg`}>
                  {formatPrice(selectedVehicle.price, 'INR')}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {isAuthenticated && (
                <>
                  <button
                    onClick={() => {
                      setEditingVehicle(selectedVehicle);
                      setNewVehicle(selectedVehicle);
                      setSelectedVehicle(null);
                      setShowAddVehicle(true);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Edit
                  </button>
                  <button
                    onClick={async () => {
                      if (!selectedVehicle) return;
                      
                      if (window.confirm('Are you sure you want to delete this vehicle? This action cannot be undone.')) {
                        try {
                          await deleteVehicle(selectedVehicle.id);
                          setSelectedVehicle(null);
                          
                          if (getVehicles && setVehicles) {
                            const updatedVehicles = await getVehicles();
                            setVehicles(Array.isArray(updatedVehicles) ? updatedVehicles : []);
                          }
                        } catch (error) {
                          console.error('Error deleting vehicle:', error);
                          alert('Failed to delete vehicle. Please try again.');
                        }
                      }
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Delete
                  </button>
                </>
              )}
              <button 
                onClick={() => setSelectedVehicle(null)}
                className={`p-3 rounded-xl transition-all duration-200 transform hover:rotate-90 hover:scale-110 ${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {/* Video Section - Full width on desktop, responsive on mobile */}
          {selectedVehicle.youtubeUrl && (
            <div className="mb-8">
              <h4 className={`font-bold text-xl mb-4 ${darkMode ? 'text-blue-300' : 'text-blue-700'} flex items-center`}>
                <div className={`w-1 h-6 ${darkMode ? 'bg-blue-400' : 'bg-blue-500'} rounded-full mr-3`}></div>
                Video Preview
              </h4>
              <div className={`w-full ${darkMode ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800' : 'bg-gradient-to-br from-blue-100 via-white to-green-100'} rounded-2xl overflow-hidden shadow-xl border-2 ${darkMode ? 'border-gray-600' : 'border-blue-200'} transform hover:scale-[1.02] transition-all duration-300`}>
                {/* Responsive video container */}
                <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
                  <iframe
                    src={formatYouTubeUrl(selectedVehicle.youtubeUrl)}
                    title={`${selectedVehicle.name} video`}
                    className="absolute top-0 left-0 w-full h-full rounded-xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    sandbox="allow-same-origin allow-scripts allow-presentation"
                  ></iframe>
                </div>
              </div>
            </div>
          )}

          {/* Vehicle Details Section */}
          <div className={`${darkMode ? 'bg-gradient-to-br from-gray-800/60 to-gray-900/60 border-gray-700' : 'bg-gradient-to-br from-white/80 to-blue-50/80 border-blue-200'} rounded-2xl p-8 shadow-xl border-2 backdrop-blur-sm`}>
            <h4 className={`font-bold text-2xl mb-6 ${darkMode ? 'text-blue-300' : 'text-blue-700'} flex items-center`}>
              <div className={`w-1 h-8 ${darkMode ? 'bg-green-400' : 'bg-green-500'} rounded-full mr-3`}></div>
              Vehicle Information
            </h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-blue-50/80 border-blue-200'} border transform hover:scale-105 transition-all duration-200`}>
                  <h5 className={`font-semibold text-lg mb-3 ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>Vehicle Details</h5>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-base leading-relaxed`}>
                    {selectedVehicle.details}
                  </p>
                </div>

                <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-green-50/80 border-green-200'} border transform hover:scale-105 transition-all duration-200`}>
                  <h5 className={`font-semibold text-lg mb-3 ${darkMode ? 'text-green-300' : 'text-green-700'}`}>Vehicle ID</h5>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-base font-mono px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    {selectedVehicle.vehicleId || 'N/A'}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-purple-50/80 border-purple-200'} border transform hover:scale-105 transition-all duration-200`}>
                  <h5 className={`font-semibold text-lg mb-3 ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>Description</h5>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-base leading-relaxed`}>
                    {selectedVehicle.details || 'No additional details available.'}
                  </p>
                </div>

                <button
                  onClick={() => setShowBooking(true)}
                  className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 hover:from-blue-600 hover:via-purple-600 hover:to-green-600 text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center space-x-3 text-lg"
                >
                  <Calendar className="h-6 w-6" />
                  <span>Schedule Viewing</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsModal;