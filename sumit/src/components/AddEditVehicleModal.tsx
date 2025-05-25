import { Dispatch, SetStateAction } from 'react';
import { Vehicle } from '../types/Vehicle';
import { X } from 'lucide-react';

interface AddEditVehicleModalProps {
  darkMode: boolean;
  showAddVehicle: boolean;
  editingVehicle: Vehicle | null;
  newVehicle: Vehicle;
  emptyVehicle: Vehicle;
  setShowAddVehicle: Dispatch<SetStateAction<boolean>>;
  setEditingVehicle: Dispatch<SetStateAction<Vehicle | null>>;
  setNewVehicle: Dispatch<SetStateAction<Vehicle>>;
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
            {/* Vehicle Details */}
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
                  type="string"
                  required
                  value={newVehicle.price}
                  onChange={(e) => setNewVehicle({ ...newVehicle, price: String(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>

            {/* Media URLs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
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

            {/* Vehicle Details Textarea */}
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

            {/* Seller Information */}
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

            {/* Location */}
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

            {/* Seller Description */}
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

            {/* New Arrival Checkbox */}
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

            {/* Submit Button */}
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
  );
};

export default AddEditVehicleModal;
