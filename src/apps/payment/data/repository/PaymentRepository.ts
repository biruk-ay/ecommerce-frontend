import NetworkProvider from "../../../../di/networkClient";
import CheckoutRequest from "../request/CheckoutRequest";

export default class PaymentRepository {

    private payNetworkClient = NetworkProvider.provideNetworkClient();

    public async checkout(id: string, amount: number) {
        return await this.payNetworkClient.execute(new CheckoutRequest(id, amount));
    }

}