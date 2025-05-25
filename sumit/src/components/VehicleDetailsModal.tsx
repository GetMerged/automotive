import { Vehicle } from '../types/Vehicle';
import { X, Calendar } from 'lucide-react';

interface VehicleDetailsModalProps {
  darkMode: boolean;
  selectedVehicle: Vehicle;
  showBooking: boolean;
  isAuthenticated: boolean;
  setEditingVehicle: (vehicle: Vehicle | null) => void;
  setNewVehicle: (vehicle: Vehicle) => void;
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
  setShowBooking: (show: boolean) => void;
  setShowAddVehicle: (show: boolean) => void;
  deleteVehicle: (id: number) => void;
  setVehicles: (vehicles: Vehicle[]) => void;
  getVehicles: () => { vehicles: Vehicle[] };
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
  const calculateDiscountedPrice = (price: number) => {
    return (price * 0.8).toFixed(2); // 20% off
  };

  const formatYouTubeUrl = (url: string): string => {
    if (!url) return '';
    
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[7].length === 11 ? match[7] : null;
    
    if (!videoId) return '';
    
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1`;
  };

  if (!selectedVehicle || showBooking) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
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
                </p>
                <p className="text-2xl font-bold text-green-600">
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
  );
};

export default VehicleDetailsModal;
