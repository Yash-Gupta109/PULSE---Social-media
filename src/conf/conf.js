const conf ={
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}


export default conf

// why we have done this because going everywhere and saying import.meta.env.VITE_APPWRITE_URL
// so many time it can happen that envirement variable do not load so in those sinarion our application may can crash
// and finding error in those case it may can be so difficult
// now this will ensure that we will get our values in string