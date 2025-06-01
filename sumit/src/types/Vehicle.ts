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
  details: string;
  seller: Seller;
  specifications?: {
    [key: string]: string;
  };
}

export type VehicleCollection = {
  vehicles: Vehicle[];
};
