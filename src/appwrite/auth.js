import conf from '../conf/conf.js'
import {Client, Account, ID} from "appwrite"

export class AuthService {
    client = new Client();
    account;

    // so now if we want to change our service provider so we just need to make changes in constructor and make some underhood changes and we are done because we are taking same paarmeter from the user
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client)
    }
    // by using this method if in future if we change our services to another vender then also we do not need to change the parameters
    async createAccount ({email, password, name}){
        // it may can fail also so we will use try and catch 
        try{
           const userAccount= await this.account.create(ID.unique(), email, password, name);
           if (userAccount){
            // call another method
            return this.login({email, password})
           }
           else{
            return userAccount;
           }
        }catch(error){
            throw error;
        }
    }
    
    async login({email, password}) {
        try {
            // return await this.account.createEmailSession(email, password);
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    // to check that accout exist or not or i am login or not

    async getCurrentUser(){
        try {
            return await this.account.get();
        }catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
        // this is the case when we were not able to reachout the server
        // but we have not handled the case where we have not got the account
        
        // if we don't get the account
        return null;
    }

    // logout
    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error)
        }
    }
}



// ok so we have made the class and exported it so whoever will import this so he will need to make an object from this class
// so what will be like i will make it an object and then export it so that will be a better approact so user will don't have  to do anything
// directly import the object and apply mehods on the objects
// so now this is an object
const authService = new AuthService();
export default authService

// so now by just using . we can access its values 
// authService. and whin is required 


// if in the future we change our service provider so we will just need to make change in this file only and we are ready to go