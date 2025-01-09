import Request from "../../../../lib/request/request";


export default class LoginRequest extends Request<string> {

    constructor(email: string, password: string) {
        super({
            url: '/user/login',
            method: "POST",
            data: {
                "email": email,
                "password": password
            }
        })
    }
}