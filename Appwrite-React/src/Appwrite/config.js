import conf from "../Config/Conf";
import {Client , Account , ID , Databases , Storage , Query} from 'appwrite'

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug,
                { title, Content: content , FeaturedImage: featuredImage, userid: userId }
            );
        } catch(error) {
            throw error;
        }
    }
    async updatePost(slug , {title , content , featuredImage , status}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId, conf.appwriteTableId , slug ,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            );
        } catch(error){
            return error;
        }
    }
    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId, conf.appwriteTableId , slug
            )
            return true;
        } catch(error){
            return error;
        }
    }
    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId, conf.appwriteTableId , slug
            )
        } catch(error){
            return error;
        }
    }
    async getAllPosts(queries = []){
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId, conf.appwriteTableId , queries ,
            ) 
        }
        catch(error){
            return error;
        }
    }
    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId , ID.unique() , file
            )
        } catch(error){
            return error;
        }
    }
    async deleteFile(fileId){
        try{
            return await this.bucket.deleteFile(
                conf.appwriteBucketId , fileId
            )
        } catch(error){
            return error;
        }
    }
    async getFile(fileId){
        try{
            return await this.bucket.getFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch(error){
            return error;
        }
    }
    getFilePreview(fileId){
    try{
        return this.bucket.getFileView(
            conf.appwriteBucketId,
            fileId
        );
    } catch(error){
        return error;
    }
}
}



const service = new Service();
export default service;

