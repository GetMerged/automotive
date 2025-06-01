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
  const calculateDiscountedPrice = (price: string) => {
    const numericPrice = parseFloat(price);
    return (numericPrice * 0.8).toFixed(2); // 20% off
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
                <p className="text-2xl font-bold text-blue-600">
                  Price: {formatPrice(selectedVehicle.price)}
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

              <div>
                <h4 className="font-semibold text-lg mb-2">Vehicle ID</h4>
                <p className="text-gray-600 dark:text-gray-400">{selectedVehicle.vehicleId || 'N/A'}</p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-2">Description</h4>
                <p className="text-gray-600 dark:text-gray-400">{selectedVehicle.details || 'No additional details available.'}</p>
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
