import { Client, Databases, Query, ID, Models } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('68333c90001b1a07ec3c');

const databases = new Databases(client);

export const COLLECTION_ID = '68333dd40002e1582d2f';
export const DATABASE_ID = '68333dc60031ad5e41f6';

export interface VehicleDocument extends Models.Document {
  vehicleId: number;
  vehicleName: string;
  price: number;
  isNew: boolean;
  imageUrl?: string;
  youtubeUrl?: string;
  details: string;
  sellerName: string;
  sellerExperience: string;
  sellerPhone: string;
  sellerEmail: string;
  sellerLocation: string;
  sellerDescription: string;
  specifications?: Record<string, string>;
}

export const vehicleService = {
  // List all vehicles
  async listVehicles() {
    try {
      return await databases.listDocuments<VehicleDocument>(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.orderDesc('$createdAt')]
      );
    } catch (error) {
      console.error('Error listing vehicles:', error);
      throw error;
    }
  },

  // Create a new vehicle
  async createVehicle(vehicleData: Omit<VehicleDocument, keyof Models.Document>): Promise<VehicleDocument> {
    try {
      return await databases.createDocument<VehicleDocument>(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        vehicleData
      ) as unknown as VehicleDocument;
    } catch (error) {
      console.error('Error creating vehicle:', error);
      throw error;
    }
  },

  // Get a vehicle by vehicleId (not document ID)
  async getVehicleByVehicleId(vehicleId: number): Promise<VehicleDocument | null> {
    try {
      const response = await databases.listDocuments<VehicleDocument>(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal('vehicleId', vehicleId)]
      );
      
      return response.documents[0] || null;
    } catch (error) {
      console.error('Error getting vehicle by ID:', error);
      throw error;
    }
  },

  // Update a vehicle
  async updateVehicle(
    documentId: string,
    updates: Partial<Omit<VehicleDocument, keyof Models.Document | 'vehicleId'>>
  ): Promise<VehicleDocument> {
    try {
      return await databases.updateDocument<VehicleDocument>(
        DATABASE_ID,
        COLLECTION_ID,
        documentId,
        updates as any
      ) as unknown as VehicleDocument;
    } catch (error) {
      console.error('Error updating vehicle:', error);
      throw error;
    }
  },

  // Delete a vehicle
  async deleteVehicle(documentId: string): Promise<void> {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, documentId);
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      throw error;
    }
  }
};
