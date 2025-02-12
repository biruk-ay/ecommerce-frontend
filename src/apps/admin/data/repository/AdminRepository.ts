import NetworkProvider from "../../../../di/networkClient";
import DashRequest from "../request/DashRequest";
import UsersRequest from "../request/UsersRequest";

export default class AdminRepository {

    private authNetworkClient = NetworkProvider.provideNetworkClient();

    public async users(email: string, token: string) {
        return await this.authNetworkClient.execute(new UsersRequest(email, token));
    }

    public async dashboard(email: string, token: string) {
        return await this.authNetworkClient.execute(new DashRequest(email, token));
    }
}