import { Dispatch, SetStateAction } from 'react';
import { Vehicle } from '../types/Vehicle';
import { X, Car, Hash, DollarSign, Youtube, FileText, Save, Plus } from 'lucide-react';

interface AddEditVehicleModalProps {
  darkMode: boolean;
  showAddVehicle: boolean;
  editingVehicle: Vehicle | null;
  newVehicle: Omit<Vehicle, 'id'> & { id?: string };
  emptyVehicle: Omit<Vehicle, 'id'>;
  setShowAddVehicle: Dispatch<SetStateAction<boolean>>;
  setEditingVehicle: Dispatch<SetStateAction<Vehicle | null>>;
  setNewVehicle: Dispatch<SetStateAction<Omit<Vehicle, 'id'> & { id?: string }>>;
  handleAddEditVehicle: (e: React.FormEvent) => Promise<void>;
}

const AddEditVehicleModal = ({
  darkMode,
  showAddVehicle,
  editingVehicle,
  newVehicle,
  emptyVehicle,
  setShowAddVehicle,
  setEditingVehicle,
  setNewVehicle,
  handleAddEditVehicle
}: AddEditVehicleModalProps) => {
  if (!showAddVehicle) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleAddEditVehicle(e);
  };

  const handleCancel = () => {
    setShowAddVehicle(false);
    setEditingVehicle(null);
    setNewVehicle(emptyVehicle);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className={`${
        darkMode 
          ? 'bg-gray-900/95 border-gray-800/50' 
          : 'bg-white/95 border-gray-200/50'
        } backdrop-blur-xl rounded-3xl max-w-4xl w-full max-h-[95vh] overflow-hidden shadow-2xl border transform animate-slide-up`}>
        
        {/* Header */}
        <div className="relative overflow-hidden">
          <div className={`absolute inset-0 ${
            darkMode ? 'bg-gradient-to-r from-blue-600/10 to-purple-600/10' : 'bg-gradient-to-r from-blue-500/5 to-purple-500/5'
          }`}></div>
          
          <div className="relative p-8 pb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-2xl ${
                  darkMode ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-500/10 text-blue-600'
                }`}>
                  {editingVehicle ? <Save className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
                </div>
                <div>
                  <h1 className={`text-3xl font-light tracking-tight ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
                  </h1>
                  <p className={`text-sm mt-1 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {editingVehicle ? 'Update vehicle information' : 'Enter vehicle details below'}
                  </p>
                </div>
              </div>
              
              <button 
                onClick={handleCancel}
                className={`p-3 rounded-2xl transition-all duration-200 hover:scale-105 hover:rotate-90 ${
                  darkMode 
                    ? 'bg-gray-800/60 hover:bg-gray-700/80 text-gray-300 hover:text-white' 
                    : 'bg-gray-100/60 hover:bg-gray-200/80 text-gray-600 hover:text-gray-900'
                }`}
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Form Content */}
        <div className="px-8 pb-8 overflow-y-auto max-h-[calc(95vh-180px)]">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* ID Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-2xl ${
                darkMode 
                  ? 'bg-gray-800/30 border-gray-700/50' 
                  : 'bg-gray-50/50 border-gray-200/50'
              } border backdrop-blur-sm`}>
                <div className="flex items-center mb-4">
                  <Hash className={`h-5 w-5 mr-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    System ID (Auto-generated)
                  </label>
                </div>
                <input
                  type="text"
                  value={newVehicle.id || 'Auto-generated on save'}
                  readOnly
                  className={`w-full px-4 py-3 rounded-xl font-mono text-sm transition-all duration-200 ${
                    darkMode 
                      ? 'bg-gray-800/50 border-gray-700/50 text-gray-400' 
                      : 'bg-gray-100/50 border-gray-200/50 text-gray-500'
                  } border cursor-not-allowed`}
                />
              </div>

              <div className={`p-6 rounded-2xl ${
                darkMode 
                  ? 'bg-gray-800/30 border-gray-700/50' 
                  : 'bg-gray-50/50 border-gray-200/50'
              } border backdrop-blur-sm`}>
                <div className="flex items-center mb-4">
                  <Car className={`h-5 w-5 mr-3 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Vehicle Number
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="e.g. UP 65 CH 5100"
                  value={newVehicle.VehicleId || ''}
                  onChange={(e) => setNewVehicle({ ...newVehicle, VehicleId: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl font-mono transition-all duration-200 focus:scale-[1.02] ${
                    darkMode 
                      ? 'bg-gray-900/50 border-gray-700/50 text-white focus:border-purple-500/50 focus:bg-gray-900/80' 
                      : 'bg-white/80 border-gray-200/50 text-gray-900 focus:border-purple-500/50 focus:bg-white'
                  } border focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                />
              </div>
            </div>

            {/* Basic Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-2xl ${
                darkMode 
                  ? 'bg-gray-800/30 border-gray-700/50' 
                  : 'bg-gray-50/50 border-gray-200/50'
              } border backdrop-blur-sm`}>
                <div className="flex items-center mb-4">
                  <Car className={`h-5 w-5 mr-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Vehicle Name *
                  </label>
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maruti Suzuki Swift"
                  value={newVehicle.name || ''}
                  onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl transition-all duration-200 focus:scale-[1.02] ${
                    darkMode 
                      ? 'bg-gray-900/50 border-gray-700/50 text-white focus:border-blue-500/50 focus:bg-gray-900/80' 
                      : 'bg-white/80 border-gray-200/50 text-gray-900 focus:border-blue-500/50 focus:bg-white'
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>

              <div className={`p-6 rounded-2xl ${
                darkMode 
                  ? 'bg-gray-800/30 border-gray-700/50' 
                  : 'bg-gray-50/50 border-gray-200/50'
              } border backdrop-blur-sm`}>
                <div className="flex items-center mb-4">
                  <DollarSign className={`h-5 w-5 mr-3 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                  <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Price (₹) *
                  </label>
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. 550000"
                  value={newVehicle.price || ''}
                  onChange={(e) => setNewVehicle({ ...newVehicle, price: e.target.value.toString() })}
                  className={`w-full px-4 py-3 rounded-xl transition-all duration-200 focus:scale-[1.02] ${
                    darkMode 
                      ? 'bg-gray-900/50 border-gray-700/50 text-white focus:border-green-500/50 focus:bg-gray-900/80' 
                      : 'bg-white/80 border-gray-200/50 text-gray-900 focus:border-green-500/50 focus:bg-white'
                  } border focus:outline-none focus:ring-2 focus:ring-green-500/20`}
                />
              </div>
            </div>

            {/* YouTube URL */}
            <div className={`p-6 rounded-2xl ${
              darkMode 
                ? 'bg-gray-800/30 border-gray-700/50' 
                : 'bg-gray-50/50 border-gray-200/50'
            } border backdrop-blur-sm`}>
              <div className="flex items-center mb-4">
                <Youtube className={`h-5 w-5 mr-3 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  YouTube Video URL *
                </label>
              </div>
              <input
                type="url"
                required
                placeholder="https://www.youtube.com/watch?v=..."
                value={newVehicle.youtubeUrl || ''}
                onChange={(e) => setNewVehicle({ ...newVehicle, youtubeUrl: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl transition-all duration-200 focus:scale-[1.02] ${
                  darkMode 
                    ? 'bg-gray-900/50 border-gray-700/50 text-white focus:border-red-500/50 focus:bg-gray-900/80' 
                    : 'bg-white/80 border-gray-200/50 text-gray-900 focus:border-red-500/50 focus:bg-white'
                } border focus:outline-none focus:ring-2 focus:ring-red-500/20`}
              />
            </div>

            {/* Details */}
            <div className={`p-6 rounded-2xl ${
              darkMode 
                ? 'bg-gray-800/30 border-gray-700/50' 
                : 'bg-gray-50/50 border-gray-200/50'
            } border backdrop-blur-sm`}>
              <div className="flex items-center mb-4">
                <FileText className={`h-5 w-5 mr-3 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Vehicle Details *
                </label>
              </div>
              <textarea
                required
                rows={5}
                placeholder="Describe the vehicle's condition, features, mileage, year, etc..."
                value={newVehicle.details}
                onChange={(e) => setNewVehicle({ ...newVehicle, details: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl resize-none transition-all duration-200 focus:scale-[1.02] ${
                  darkMode 
                    ? 'bg-gray-900/50 border-gray-700/50 text-white focus:border-orange-500/50 focus:bg-gray-900/80' 
                    : 'bg-white/80 border-gray-200/50 text-gray-900 focus:border-orange-500/50 focus:bg-white'
                } border focus:outline-none focus:ring-2 focus:ring-orange-500/20`}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6">
              <button
                type="button"
                onClick={handleCancel}
                className={`px-8 py-4 rounded-2xl font-medium transition-all duration-200 hover:scale-105 ${
                  darkMode 
                    ? 'bg-gray-800/60 hover:bg-gray-700/80 text-gray-300 hover:text-white border border-gray-700/50' 
                    : 'bg-gray-100/60 hover:bg-gray-200/80 text-gray-600 hover:text-gray-900 border border-gray-200/50'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-8 py-4 rounded-2xl font-medium text-white transition-all duration-200 hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2 ${
                  editingVehicle
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                    : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600'
                }`}
              >
                {editingVehicle ? <Save className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                <span>{editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AddEditVehicleModal;