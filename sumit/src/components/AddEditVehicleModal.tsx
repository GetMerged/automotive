import { Dispatch, SetStateAction } from 'react';
import { Vehicle } from '../types/Vehicle';
import { X } from 'lucide-react';

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

  return (
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
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Vehicle ID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="id" className="block text-sm font-medium mb-1">ID (Auto-generated)</label>
                <input
                  id="id"
                  type="text"
                  value={newVehicle.id || ''}
                  readOnly
                  className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-600 cursor-not-allowed"
                />
              </div>
              <div>
                <label htmlFor="vehicleId" className="block text-sm font-medium mb-1">Vehicle ID</label>
                <input
                  id="vehicleId"
                  type="number"
                  value={newVehicle.vehicleId || ''}
                  onChange={(e) => setNewVehicle({ ...newVehicle, vehicleId: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Vehicle Name *</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={newVehicle.name || ''}
                  onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium mb-1">Price *</label>
                <input
                  id="price"
                  type="text"
                  required
                  value={newVehicle.price || ''}
                  onChange={(e) => setNewVehicle({ ...newVehicle, price: e.target.value.toString() })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>

            {/* YouTube URL */}
            <div>
              <label htmlFor="youtubeUrl" className="block text-sm font-medium mb-1">YouTube URL *</label>
              <input
                id="youtubeUrl"
                type="url"
                required
                value={newVehicle.youtubeUrl || ''}
                onChange={(e) => setNewVehicle({ ...newVehicle, youtubeUrl: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>

            {/* Details */}
            <div>
              <label htmlFor="details" className="block text-sm font-medium mb-1">Details *</label>
              <textarea
                id="details"
                required
                rows={4}
                value={newVehicle.details}
                onChange={(e) => setNewVehicle({ ...newVehicle, details: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowAddVehicle(false);
                  setEditingVehicle(null);
                  setNewVehicle(emptyVehicle);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-600"
              >
                {editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditVehicleModal;
