import NetworkClient from "../lib/request/networkClient";
import { BASE_URL } from "../configs/config";

export default class NetworkProvider {

    public static networkClient: NetworkClient;

    public static provideNetworkClient(): NetworkClient{
		if(this.networkClient === undefined){
			this.networkClient = new NetworkClient(BASE_URL);
		}
		return this.networkClient;
	}
}