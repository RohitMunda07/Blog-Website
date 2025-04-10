import { Client, Databases, Storage, ID, Query } from "appwrite";
import conf from "../conf/conf";
import { useId } from "react";
import authService from "./auth";

export class AppwriteService {
    client = new Client(); // Creating an Appwrite client instance
    bucket; // Storage bucket reference (for files like images)
    databases; // Database instance for managing collections

    constructor() {
        this.client.setEndpoint(conf.appWriteURL)  // Connecting to Appwrite server
            .setProject(conf.appWriteProjectID);   // Setting project ID

        this.databases = new Databases(this.client); // Initializing database service
        this.bucket = new Storage(this.client); // Initializing storage service (for images, files, etc.)
    }


    // Content-Data services:-------------

    // async createPost({ title, slug, content,  featuredImage, status, userid }) {
    //     const currentUser = await authService.account.get();
    //     try {
    //         return await this.databases.createDocument(
    //             conf.appWriteDatabaseID, // Unique database ID
    //             conf.appWriteCollectionID, // Unique collection ID
    //             ID.unique(),   // Generates a unique document ID automatically

    //             // object row of contents 
    //             {
    //                 title,
    //                 content,
    //                 featuredimage: featuredImage,
    //                 status,
    //                 userid: currentUser.$id,
    //             }
    //         )
    //     } catch (error) {
    //         console.log("Error Creating Post :: ", error);
    //     }
    // }

    // // here the first parameter is for document ID which need to be updated
    // async updatePost(slug, { title, content, featuredImage, status }) {
    //     try {
    //         return await this.databases.updateDocument(
    //             conf.appWriteDatabaseID,
    //             conf.appWriteCollectionID,
    //             slug,
    //             {
    //                 title,
    //                 content,
    //                 featuredimage: featuredImage,
    //                 status,
    //             }
    //         )
    //     } catch (error) {
    //         console.log("Error Updating Post :: ", error);
    //     }
    // }


    async createPost({ title, slug, content, featuredimage, status, userid }) {
        const currentUser = await authService.account.get();
        try {
            return await this.databases.createDocument(
                conf.appWriteDatabaseID,
                conf.appWriteCollectionID,
                ID.unique(),
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userid: currentUser.$id,
                }
            )
        } catch (error) {
            console.log("Error Creating Post :: ", error);
        }
    }

    async updatePost(slug, { title, content, featuredimage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appWriteDatabaseID,
                conf.appWriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                }
            )
        } catch (error) {
            console.log("Error Updating Post :: ", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appWriteDatabaseID,
                conf.appWriteCollectionID,
                slug
            )
            return true; // we will be handling this in front-end part
        } catch (error) {
            console.log("Error Deleting Post :: ", error);
            return false; // we will be handling this in front-end part
        }
    }

    // async getPost(slug) {
    //     try {
    //         return await this.databases.getDocument(
    //             conf.appWriteDatabaseID,
    //             conf.appWriteCollectionID,
    //             slug
    //         )
    //     } catch (error) {
    //         console.log("Error Getting Post :: ", error);
    //         return false;
    //     }
    // }

    async getPost(slug) {
        try {
            const post = await this.databases.getDocument(
                conf.appWriteDatabaseID,
                conf.appWriteCollectionID,
                slug
            );
            console.log("Retrieved post:", post); // Log the post structure
            return post;
        } catch (error) {
            console.log("Error Getting Post :: ", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseID,
                conf.appWriteCollectionID,
                queries,
            )
        } catch (error) {
            console.log("Error Getting All Posts :: ", error);
            return false;
        }
    }

    // File services:-------------

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Error Uploading File :: ", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appWriteBucketID,
                fileId
            )

            return true;
        } catch (error) {
            console.log("Error Deleting File :: ", error);
            return false;
        }
    }

    // since it has fast response we don't need async await
    // getFilePreview(fileId) {
    //     if (!fileId) return null;
    //     return this.bucket.getFilePreview(
    //         conf.appWriteBucketID,
    //         fileId
    //     )
    // }

    // In your AppwriteService class
    getFilePreview(fileId) {
        if (!fileId) {
            return null;
        }
        
        // Return the complete URL string
        return this.bucket.getFileView(
            conf.appWriteBucketID,
            fileId
        );
    }

}

const appwriteService = new AppwriteService();
export default appwriteService
