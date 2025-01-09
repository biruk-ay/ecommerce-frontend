import { type AxiosRequestConfig } from "axios";

export default class Request<T>{

	public config: AxiosRequestConfig;

	constructor(config: AxiosRequestConfig){
		this.config = config;
	}

	deserializeResponse(response: any): T{
		return response;
	}

}