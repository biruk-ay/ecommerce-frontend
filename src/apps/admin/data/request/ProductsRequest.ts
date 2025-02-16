import Request from "../../../../lib/request/request"

export default class ProductRequest extends Request<string> {

    constructor(email: string, token: string) {
        super({
            url: '/admin/products',
            method: "POST",
            data: {
                "email": email,
                "token": token
            }
        })
    }
}