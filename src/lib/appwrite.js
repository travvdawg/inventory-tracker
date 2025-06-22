import { Client, Account, Databases, Storage, ID, Query } from 'appwrite';

export const client = new Client();

client
	.setEndpoint('https://cloud.appwrite.io/v1')
	.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // ✅ Make sure this env var is set

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client); // <- This must be exported if you're using it elsewhere

export { ID, Query };
