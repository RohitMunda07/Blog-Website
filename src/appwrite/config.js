import { Client, Databases, Storage, ID } from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
  .setProject('67fbb0e0001ac9fa41e5'); // Replace with your project ID

export const databases = new Databases(client);
export const storage = new Storage(client);
export const IDGen = ID;
