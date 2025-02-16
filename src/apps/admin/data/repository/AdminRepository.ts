import NetworkProvider from "../../../../di/networkClient";
import DashRequest from "../request/DashRequest";
import ProductRequest from "../request/ProductsRequest";
import SalesRequest from "../request/SalesRequest";
import UsersRequest from "../request/UsersRequest";

export default class AdminRepository {

    private authNetworkClient = NetworkProvider.provideNetworkClient();
    
    public async dashboard(email: string, token: string) {
        return await this.authNetworkClient.execute(new DashRequest(email, token));
    }

    public async users(email: string, token: string) {
        return await this.authNetworkClient.execute(new UsersRequest(email, token));
    }

    public async products(email: string, token: string) {
        return await this.authNetworkClient.execute(new ProductRequest(email, token));
    }

    public async sales(email: string, token: string) {
        return await this.authNetworkClient.execute(new SalesRequest(email, token));
    }
}