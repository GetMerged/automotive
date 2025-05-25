import { Vehicle } from '../types/Vehicle';
import { Youtube } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  darkMode: boolean;
  onViewDetails: (vehicle: Vehicle) => void;
}

const VehicleCard = ({ vehicle, darkMode, onViewDetails }: VehicleCardProps) => {
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

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
      <div className="relative pt-[56.25%] bg-gray-200">
        {vehicle.youtubeUrl ? (
          <iframe
            src={formatYouTubeUrl(vehicle.youtubeUrl)}
            title={`${vehicle.name} video`}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            sandbox="allow-same-origin allow-scripts allow-presentation"
          ></iframe>
        ) : vehicle.imageUrl && (
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
        {vehicle.youtubeUrl && (
          <div className="absolute bottom-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-sm flex items-center">
            <Youtube className="h-4 w-4 mr-1" />
            Watch Video
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{vehicle.name}</h3>
        <div className="flex items-center justify-between mb-4">
          <div>              <p className="text-gray-500 dark:text-gray-400 line-through">
                ₹{vehicle.price.toLocaleString('en-IN')}
              </p>
              <p className="text-2xl font-bold text-green-600">
                ₹{calculateDiscountedPrice(vehicle.price).toLocaleString('en-IN')}
              </p>
          </div>
          <button 
            onClick={() => onViewDetails(vehicle)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
