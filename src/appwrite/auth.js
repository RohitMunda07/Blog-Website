import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf"

export class AuthService {

    client = new Client()
    account

    constructor() {
        this.client
            .setEndpoint(conf.appWriteURL)
            .setProject(conf.appWriteProjectID);

        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(), // userId
                email, // email
                password, // password
                name // name (optional)
            )

            if (userAccount) {
                // Return the login result
                return await this.login({ email, password })
            } else {
                return userAccount;
            }

        } catch (error) {
            console.log("Error Creating Account :: ", error);
            throw error; // Re-throw the error so the component can handle it
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("Error Login :: ", error);
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Error logout :: ", error);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            await this.logout(); // 👈 auto-logout on invalid session
            console.log("Error Getting Account :: ", error);
        }

        return null // account didn't found
    }

}

const authService = new AuthService();

export default authService;
