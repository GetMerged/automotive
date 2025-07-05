import { Client, Databases, Query, ID, Models } from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('68333c90001b1a07ec3c');

const databases = new Databases(client);

export const COLLECTION_ID = '68333dd40002e1582d2f';
export const DATABASE_ID = '68333dc60031ad5e41f6';

export interface VehicleDocument extends Models.Document {
  VehicleId: string;
  vehicleName: string;
  price: number;
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

// Alternative service using fetch with manual headers
export const vehicleServiceWithFetch = {
  // List all vehicles using fetch
  async listVehicles() {
    try {
      const queries = encodeURIComponent(JSON.stringify([{ method: 'orderDesc', attribute: '$createdAt' }]));
      const url = `https://fra.cloud.appwrite.io/v1/databases/${DATABASE_ID}/collections/${COLLECTION_ID}/documents?queries[0]=${queries}`;
      
      const response = await fetch(url, {
        headers: {
          'X-Appwrite-Project': '68333c90001b1a07ec3c',
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error listing vehicles:', error);
      throw error;
    }
  },

  // Create a new vehicle using fetch
  async createVehicle(vehicleData: Omit<VehicleDocument, keyof Models.Document>): Promise<VehicleDocument> {
    try {
      const url = `https://fra.cloud.appwrite.io/v1/databases/${DATABASE_ID}/collections/${COLLECTION_ID}/documents`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'X-Appwrite-Project': '68333c90001b1a07ec3c',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documentId: ID.unique(),
          data: vehicleData
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating vehicle:', error);
      throw error;
    }
  },

  // Get a vehicle by VehicleId using fetch
  async getVehicleByVehicleId(VehicleId: string): Promise<VehicleDocument | null> {
    try {
      const queries = encodeURIComponent(JSON.stringify([{ method: 'equal', attribute: 'VehicleId', values: [VehicleId] }]));
      const url = `https://fra.cloud.appwrite.io/v1/databases/${DATABASE_ID}/collections/${COLLECTION_ID}/documents?queries[0]=${queries}`;
      
      const response = await fetch(url, {
        headers: {
          'X-Appwrite-Project': '68333c90001b1a07ec3c',
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.documents[0] || null;
    } catch (error) {
      console.error('Error getting vehicle by VehicleId:', error);
      throw error;
    }
  },

  // Update a vehicle using fetch
  async updateVehicle(
    documentId: string,
    updates: Partial<Omit<VehicleDocument, keyof Models.Document | 'VehicleId'>>
  ): Promise<VehicleDocument> {
    try {
      const url = `https://fra.cloud.appwrite.io/v1/databases/${DATABASE_ID}/collections/${COLLECTION_ID}/documents/${documentId}`;
      
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'X-Appwrite-Project': '68333c90001b1a07ec3c',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: updates })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating vehicle:', error);
      throw error;
    }
  },

  // Delete a vehicle using fetch
  async deleteVehicle(documentId: string): Promise<void> {
    try {
      const url = `https://fra.cloud.appwrite.io/v1/databases/${DATABASE_ID}/collections/${COLLECTION_ID}/documents/${documentId}`;
      
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'X-Appwrite-Project': '68333c90001b1a07ec3c',
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      throw error;
    }
  }
};

// Keep your original service as well for when CORS is properly configured
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

  // Get a vehicle by VehicleId (not document ID)
  async getVehicleByVehicleId(VehicleId: string): Promise<VehicleDocument | null> {
    try {
      const response = await databases.listDocuments<VehicleDocument>(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal('VehicleId', VehicleId)]
      );
      
      return response.documents[0] || null;
    } catch (error) {
      console.error('Error getting vehicle by VehicleId:', error);
      throw error;
    }
  },

  // Update a vehicle
  async updateVehicle(
    documentId: string,
    updates: Partial<Omit<VehicleDocument, keyof Models.Document | 'VehicleId'>>
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