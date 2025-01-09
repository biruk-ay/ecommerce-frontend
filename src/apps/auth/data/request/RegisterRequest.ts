import Request from "../../../../lib/request/request";


export default class RegisterRequest extends Request<string> {
    constructor(name: string, email: string, password: string){
        super({
            url: "/user/register",
            method: "POST",
            data: {
                "name": name,
                "email": email,
                "password": password
            }
        })

    }
}