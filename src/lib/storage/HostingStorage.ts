import IFileStorage from "./IFileStorage.js";
import axios from "axios";

export default class HostingStorage implements IFileStorage {

    public host: string;

    constructor(host: string) {
        this.host = host;
    }


    public async get_url(filename: string) {
        const response = await axios.get(`${this.host}/geturl.php?filename=${filename}`);
        
        if(response.status !== 200) {
            throw new Error(`Get url failed with ${response.status}`);
        }
        
        return response.data;
    }


    public async upload(file: File) {
        const form = new FormData();
        console.log("is it file: ", file instanceof File)
        form.append('file', file, file.name);
        console.log(form);
        
        const response = await axios.post(`${this.host}/upload.php`, form, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        if(response.status !== 200) {
            throw new Error(`Upload faild with ${response.status}`)
        }
        return this.get_url(file.name);
    }

}