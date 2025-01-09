import LoginRequest from "../request/LoginRequest";
import NetworkProvider from "../../../../di/networkClient";
import RegisterRequest from "../request/RegisterRequest";

export default class AuthRepository {

    private authNetworkClient = NetworkProvider.provideNetworkClient();

    public async login(email: string, password: string) {
        return await this.authNetworkClient.execute(new LoginRequest(email, password));
    }

    public async register(name: string, email: string, password: string) {
        return await this.authNetworkClient.execute(new RegisterRequest(name, email, password));
    }
}