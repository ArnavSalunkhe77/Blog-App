console.log("APPWRITE URL =", import.meta.env.VITE_APPWRITE_URL);
const conf = {
    appwriteURL : String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DB_ID),
    appwriteTableId : String(import.meta.env.VITE_APPWRITE_TABLE_ID),
    appwriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}

export default conf;