import { vehicleService } from '../lib/appwrite';

export interface Vehicle {
  id: string;
  vehicleId: number;
  name: string;
  price: string;
  youtubeUrl: string;
  details: string;
}

// Get all vehicles from Appwrite
export const getVehicles = async (): Promise<Vehicle[]> => {
  try {
    const response = await vehicleService.listVehicles();
    return response.documents.map(doc => ({
      id: doc.id,
      vehicleId: doc.vehicleId,
      name: doc.name,
      price: doc.price,
      youtubeUrl: doc.youtubeUrl,
      details: doc.details
    }));
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return [];
  }
};

// Add a new vehicle to Appwrite
export const addVehicle = async (vehicleData: Omit<Vehicle, 'id'>): Promise<Vehicle> => {
  try {
    // Parse the price string to a number, removing any non-numeric characters except decimal point
    const priceValue = parseFloat(vehicleData.price.replace(/[^0-9.-]+/g, '')) || 0;
    
    // Create a properly formatted vehicle data object that matches the Appwrite schema
    const vehiclePayload = {
      vehicleId: vehicleData.vehicleId,
      vehicleName: vehicleData.name,
      price: priceValue, // Send as number
      youtubeUrl: vehicleData.youtubeUrl || '',
      details: vehicleData.details
    };
    
    console.log('Creating vehicle with payload:', vehiclePayload);
    
    const response = await vehicleService.createVehicle(vehiclePayload);
    
    // Format the price for display in the UI
    return {
      id: response.$id,
      vehicleId: response.vehicleId,
      name: response.vehicleName,
      price: response.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
      youtubeUrl: response.youtubeUrl || '',
      details: response.details
    };
  } catch (error) {
    console.error('Error adding vehicle:', error);
    throw error;
  }
};

// Update an existing vehicle in Appwrite
export const updateVehicle = async (vehicle: Vehicle): Promise<Vehicle> => {
  try {
    // Parse the price string to a number, removing any non-numeric characters except decimal point
    const priceValue = parseFloat(vehicle.price.replace(/[^0-9.-]+/g, '')) || 0;
    
    // Create update payload with correct field names for Appwrite
    const updatePayload = {
      vehicleName: vehicle.name,
      price: priceValue, // Send as number
      youtubeUrl: vehicle.youtubeUrl || '',
      details: vehicle.details
    };
    
    console.log('Updating vehicle with payload:', updatePayload);
    
    const response = await vehicleService.updateVehicle(vehicle.id, updatePayload);
    
    // Format the price for display in the UI
    return {
      id: response.$id,
      vehicleId: response.vehicleId,
      name: response.vehicleName,
      price: response.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
      youtubeUrl: response.youtubeUrl || '',
      details: response.details
    };
  } catch (error) {
    console.error('Error updating vehicle:', error);
    throw error;
  }
};

// Delete a vehicle from Appwrite
export const deleteVehicle = async (id: string): Promise<void> => {
  try {
    await vehicleService.deleteVehicle(id);
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    throw error;
  }
};
