import { Client, Databases, Query, ID } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
    .setProject('68333c90001b1a07ec3c');        // Replace with your project ID

const databases = new Databases(client);

export const COLLECTION_ID = '68333dd40002e1582d2f'; // Replace with your collection ID
export const DATABASE_ID = '68333dc60031ad5e41f6';     // Replace with your database ID

export interface VehicleDetails {
    id: string;
    vehicleId: number;
    vehicleName: string;
    vehicleNumber: string;
    description: string;
    specifications: {
        engine?: string;
        transmission?: string;
        fuelType?: string;
        seatingCapacity?: number;
        mileage?: string;
    };
    features: string[];
    youtubeUrl: string;
}

export const vehicleService = {
    async createVehicleDetails(
        vehicleId: number, 
        vehicleName: string,
        vehicleNumber: string,
        description: string,
        specifications: VehicleDetails['specifications'],
        features: string[],
        youtubeUrl: string
    ): Promise<VehicleDetails> {
        try {
            const response = await databases.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {
                    vehicleId,
                    vehicleName,
                    vehicleNumber,
                    description,
                    specifications,
                    features,
                    youtubeUrl,
                }
            );
            return response as unknown as VehicleDetails;
        } catch (error) {
            console.error('Error creating vehicle details:', error);
            throw error;
        }
    },

    async getVehicleDetails(vehicleId: number): Promise<VehicleDetails | null> {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTION_ID,
                [Query.equal('vehicleId', vehicleId)]
            );
            
            if (response.documents.length > 0) {
                return response.documents[0] as unknown as VehicleDetails;
            }
            return null;
        } catch (error) {
            console.error('Error fetching vehicle details:', error);
            throw error;
        }
    },

    async updateVehicleDetails(
        id: string,
        updates: Partial<Omit<VehicleDetails, 'id' | 'vehicleId'>>
    ): Promise<VehicleDetails> {
        try {
            const response = await databases.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                id,
                updates
            );
            return response as unknown as VehicleDetails;
        } catch (error) {
            console.error('Error updating vehicle details:', error);
            throw error;
        }
    },

    async deleteVehicleDetails(id: string): Promise<void> {
        try {
            await databases.deleteDocument(
                DATABASE_ID,
                COLLECTION_ID,
                id
            );
        } catch (error) {
            console.error('Error deleting vehicle details:', error);
            throw error;
        }
    }
};
