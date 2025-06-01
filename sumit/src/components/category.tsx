import { vehicleService } from '../lib/appwrite';

export interface Seller {
  name: string;
  experience: string;
  phone: string;
  email: string;
  location: string;
  description: string;
}

export interface Vehicle {
  id: number;
  name: string;
  price: number;
  isNew: boolean;
  imageUrl?: string;
  youtubeUrl?: string;
  seller: Seller;
  details: string;
  specifications?: {
    [key: string]: string;
  };
}

// Get all vehicles from Appwrite
export const getVehicles = async (): Promise<Vehicle[]> => {
  try {
    const response = await vehicleService.listVehicles();
    return response.documents.map(doc => ({
      id: doc.vehicleId,
      name: doc.vehicleName,
      price: doc.price,
      isNew: doc.isNew,
      imageUrl: doc.imageUrl,
      youtubeUrl: doc.youtubeUrl,
      details: doc.details,
      seller: {
        name: doc.sellerName,
        experience: doc.sellerExperience,
        phone: doc.sellerPhone,
        email: doc.sellerEmail,
        location: doc.sellerLocation,
        description: doc.sellerDescription
      },
      specifications: doc.specifications || {}
    }));
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return [];
  }
};

// Add a new vehicle to Appwrite
export const addVehicle = async (vehicle: Omit<Vehicle, 'id'>): Promise<Vehicle> => {
  try {
    const newVehicle = await vehicleService.createVehicle({
      vehicleId: Date.now(),
      vehicleName: vehicle.name,
      price: vehicle.price,
      isNew: vehicle.isNew,
      imageUrl: vehicle.imageUrl || '',
      youtubeUrl: vehicle.youtubeUrl || '',
      details: vehicle.details,
      sellerName: vehicle.seller.name,
      sellerExperience: vehicle.seller.experience,
      sellerPhone: vehicle.seller.phone,
      sellerEmail: vehicle.seller.email,
      sellerLocation: vehicle.seller.location,
      sellerDescription: vehicle.seller.description,
      specifications: vehicle.specifications || {}
    });

    return {
      ...vehicle,
      id: newVehicle.vehicleId
    };
  } catch (error) {
    console.error('Error adding vehicle:', error);
    throw error;
  }
};

// Update an existing vehicle in Appwrite
export const updateVehicle = async (vehicle: Vehicle): Promise<Vehicle> => {
  try {
    // First get the document ID for this vehicle
    const existing = await vehicleService.getVehicleByVehicleId(vehicle.id);
    
    if (!existing) {
      throw new Error(`Vehicle with ID ${vehicle.id} not found`);
    }

    await vehicleService.updateVehicle(existing.$id, {
      vehicleName: vehicle.name,
      price: vehicle.price,
      isNew: vehicle.isNew,
      imageUrl: vehicle.imageUrl || '',
      youtubeUrl: vehicle.youtubeUrl || '',
      details: vehicle.details,
      sellerName: vehicle.seller.name,
      sellerExperience: vehicle.seller.experience,
      sellerPhone: vehicle.seller.phone,
      sellerEmail: vehicle.seller.email,
      sellerLocation: vehicle.seller.location,
      sellerDescription: vehicle.seller.description,
      specifications: vehicle.specifications || {}
    });

    return vehicle;
  } catch (error) {
    console.error('Error updating vehicle:', error);
    throw error;
  }
};

// Delete a vehicle from Appwrite
export const deleteVehicle = async (id: number): Promise<void> => {
  try {
    const existing = await vehicleService.getVehicleByVehicleId(id);
    
    if (existing) {
      await vehicleService.deleteVehicle(existing.$id);
    }
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    throw error;
  }
};

// Get a single vehicle by ID
export const getVehicleById = async (id: number): Promise<Vehicle | null> => {
  try {
    const doc = await vehicleService.getVehicleByVehicleId(id);
    
    if (!doc) return null;
    
    return {
      id: doc.vehicleId,
      name: doc.vehicleName,
      price: doc.price,
      isNew: doc.isNew,
      imageUrl: doc.imageUrl,
      youtubeUrl: doc.youtubeUrl,
      details: doc.details,
      seller: {
        name: doc.sellerName,
        experience: doc.sellerExperience,
        phone: doc.sellerPhone,
        email: doc.sellerEmail,
        location: doc.sellerLocation,
        description: doc.sellerDescription
      },
      specifications: doc.specifications || {}
    };
  } catch (error) {
    console.error('Error getting vehicle by ID:', error);
    return null;
  }
};