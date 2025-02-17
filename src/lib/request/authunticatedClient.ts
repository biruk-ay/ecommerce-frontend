import axios, { type AxiosInstance } from "axios";
import NetworkClient from "./networkClient";


export default class AuthenticatedNetworkClient extends NetworkClient{

	private token: string;

	constructor(
		baseUrl: string,
		token: string
	){
		super(baseUrl);
		this.token = token;
	}

	protected onCreateClient(baseUrl: string): AxiosInstance {
		return axios.create({
			baseURL: baseUrl,
			headers: {
				"Authorization": `Token ${this.token}`
			}
		});
	}



}