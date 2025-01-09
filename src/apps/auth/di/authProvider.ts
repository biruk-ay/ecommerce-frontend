import AuthRepository from "../data/repository/authRepository";


export default class AuthProvider {

    public static authProvider: AuthRepository;

    public static provideAuth(): AuthRepository {
        if (this.authProvider === undefined) {
            this.authProvider = new AuthRepository();
        }
        return this.authProvider;
    }
}