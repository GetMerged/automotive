interface VehicleSeller {
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
  price: string;
  youtubeUrl: string | undefined;
  details: string;
  
  
}

export interface VehicleCollection {
  vehicles: Vehicle[];
}
