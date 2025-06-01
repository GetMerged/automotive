export interface Vehicle {
  id: string;
  vehicleId?: number;
  name: string;
  price: string;
  youtubeUrl: string;
  details: string;
}

export type VehicleCollection = {
  vehicles: Vehicle[];
};
