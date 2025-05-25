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
    [key: string]: Vehicle[];
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
  
  // Add a new vehicle
  export const addVehicle = (vehicle: Vehicle): void => {
    const vehicles = getVehicles();
    vehicles.vehicles.push(vehicle);
    saveVehicles(vehicles);
  };
  
  // Delete a vehicle
  export const deleteVehicle = (id: number): void => {
    const vehicles = getVehicles();
    vehicles.vehicles = vehicles.vehicles.filter(v => v.id !== id);
    saveVehicles(vehicles);
  };
  
  // Update a vehicle
  export const updateVehicle = (updatedVehicle: Vehicle): void => {
    const vehicles = getVehicles();
    vehicles.vehicles = vehicles.vehicles.map(v => 
      v.id === updatedVehicle.id ? updatedVehicle : v
    );
    saveVehicles(vehicles);
  };