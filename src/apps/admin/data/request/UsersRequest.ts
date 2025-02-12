import Request from "../../../../lib/request/request"

export default class UsersRequest extends Request<string> {

    constructor(email: string, token: string) {
        super({
            url: '/admin/users',
            method: "POST",
            data: {
                "email": email,
                "token": token
            }
        })
    }
}