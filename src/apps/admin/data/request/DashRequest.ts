import Request from "../../../../lib/request/request"

export default class DashRequest extends Request<string> {

    constructor(email: string, token: string) {
        super({
            url: '/admin/info',
            method: "POST",
            data: {
                "email": email,
                "token": token
            }
        })
    }
}