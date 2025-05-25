import { videoService } from '../lib/appwrite';

export type Vehicle = {
    id: number;
    name: string;
    price: number;
    isNew: boolean;
    imageUrl?: string;
    youtubeUrl?: string;
    seller: {
      name: string;
      experience: string;
      phone: string;
      email: string;
      location: string;
      description: string;
    };
    details: string;
    specifications?: {
      [key: string]: string;
    };
  };
  
  export type VehicleCollection = {
    vehicles: Vehicle[];
  };
  
  // Initial data structure
  const initialVehicles: VehicleCollection = {
    vehicles: []
  };
  
  // Get vehicles from localStorage or use initial data
  export const getVehicles = (): VehicleCollection => {
    const storedVehicles = localStorage.getItem('vehicles');
    return storedVehicles ? JSON.parse(storedVehicles) : initialVehicles;
  };
  
  // Save vehicles to localStorage
  export const saveVehicles = (vehicles: VehicleCollection): void => {
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
  };
  
  // Add a new vehicle with Appwrite video handling
  export const addVehicle = async (vehicle: Vehicle): Promise<void> => {
    const vehicles = getVehicles();
    // Store vehicle data in localStorage
    vehicles.vehicles.push(vehicle);
    saveVehicles(vehicles);

    // If there's a YouTube URL, store it in Appwrite
    if (vehicle.youtubeUrl) {
      try {
        await videoService.createVideoLink(vehicle.id, vehicle.youtubeUrl);
      } catch (error) {
        console.error('Error storing video link in Appwrite:', error);
      }
    }
  };
  
  // Delete a vehicle with Appwrite video cleanup
  export const deleteVehicle = async (id: number): Promise<void> => {
    // First, try to get and delete any associated video link
    try {
      const videoLink = await videoService.getVideoLink(id);
      if (videoLink) {
        await videoService.deleteVideoLink(videoLink.id);
      }
    } catch (error) {
      console.error('Error deleting video link from Appwrite:', error);
    }

    // Then remove from localStorage
    const vehicles = getVehicles();
    vehicles.vehicles = vehicles.vehicles.filter(v => v.id !== id);
    saveVehicles(vehicles);
  };
  
  // Update a vehicle with Appwrite video handling
  export const updateVehicle = async (updatedVehicle: Vehicle): Promise<void> => {
    try {
      // Check for existing video link
      const existingVideo = await videoService.getVideoLink(updatedVehicle.id);
      
      if (existingVideo) {
        if (!updatedVehicle.youtubeUrl) {
          // If URL was removed, delete from Appwrite
          await videoService.deleteVideoLink(existingVideo.id);
        } else if (existingVideo.youtubeUrl !== updatedVehicle.youtubeUrl) {
          // If URL changed, update in Appwrite
          await videoService.updateVideoLink(existingVideo.id, updatedVehicle.youtubeUrl);
        }
      } else if (updatedVehicle.youtubeUrl) {
        // If no existing video but new URL provided, create in Appwrite
        await videoService.createVideoLink(updatedVehicle.id, updatedVehicle.youtubeUrl);
      }
    } catch (error) {
      console.error('Error updating video link in Appwrite:', error);
    }

    // Update in localStorage
    const vehicles = getVehicles();
    vehicles.vehicles = vehicles.vehicles.map(v => 
      v.id === updatedVehicle.id ? updatedVehicle : v
    );
    saveVehicles(vehicles);
  };