import AdminRepository from "../data/repository/AdminRepository";

export default class AdminProvider {

    public static AdminProvider: AdminRepository;

    public static provideAdmin(): AdminRepository {
        if (this.AdminProvider === undefined) {
            this.AdminProvider = new AdminRepository();
        }
        return this.AdminProvider;
    }
}