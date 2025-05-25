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
  price: number;
  isNew: boolean;
  imageUrl: string | undefined;
  youtubeUrl: string | undefined;
  details: string;
  seller: VehicleSeller;
  specifications?: {
    [key: string]: string;
  };
}

export interface VehicleCollection {
  vehicles: Vehicle[];
}
