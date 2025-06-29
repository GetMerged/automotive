export interface Vehicle {
  id: string;
  VehicleId?: string; // Capital V for VehicleId
  name: string;
  price: string;
  youtubeUrl: string;
  details: string;
}

export type VehicleCollection = {
  vehicles: Vehicle[];
};
