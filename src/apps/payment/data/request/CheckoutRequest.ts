import Request from "../../../../lib/request/request";


export default class CheckoutRequest extends Request<string> {

    constructor(id: string, amount: number) {
        super({
            url: '/pay/payment',
            method: "POST",
            data: {
                "id": id,
                "amount": amount
            }
        })
    }
}