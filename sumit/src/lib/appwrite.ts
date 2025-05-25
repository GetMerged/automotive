import { Client, Databases, Query, ID } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
    .setProject('68333c90001b1a07ec3c');        // Replace with your project ID

const databases = new Databases(client);

export const COLLECTION_ID = '68333dd40002e1582d2f'; // Replace with your collection ID
export const DATABASE_ID = '68333dc60031ad5e41f6';     // Replace with your database ID

export interface VideoLink {
    id: string;
    vehicleId: number;
    youtubeUrl: string;
}

export const videoService = {
    async createVideoLink(vehicleId: number, youtubeUrl: string): Promise<VideoLink> {
        try {
            const response = await databases.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {
                    vehicleId,
                    youtubeUrl,
                }
            );
            return response as VideoLink;
        } catch (error) {
            console.error('Error creating video link:', error);
            throw error;
        }
    },

    async getVideoLink(vehicleId: number): Promise<VideoLink | null> {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTION_ID,
                [Query.equal('vehicleId', vehicleId)]
            );
            
            if (response.documents.length > 0) {
                return response.documents[0] as VideoLink;
            }
            return null;
        } catch (error) {
            console.error('Error fetching video link:', error);
            throw error;
        }
    },

    async updateVideoLink(id: string, youtubeUrl: string): Promise<VideoLink> {
        try {
            const response = await databases.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                id,
                {
                    youtubeUrl
                }
            );
            return response as VideoLink;
        } catch (error) {
            console.error('Error updating video link:', error);
            throw error;
        }
    },

    async deleteVideoLink(id: string): Promise<void> {
        try {
            await databases.deleteDocument(
                DATABASE_ID,
                COLLECTION_ID,
                id
            );
        } catch (error) {
            console.error('Error deleting video link:', error);
            throw error;
        }
    }
};
