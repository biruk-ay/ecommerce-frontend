import Request from "../../../../lib/request/request"

export default class SalesRequest extends Request<string> {

    constructor(email: string, token: string) {
        super({
            url: '/admin/sales',
            method: "POST",
            data: {
                "email": email,
                "token": token
            }
        })
    }
}