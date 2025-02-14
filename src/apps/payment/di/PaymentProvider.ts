import PaymentRepository from "../data/repository/PaymentRepository";


export default class PaymentProvider {

    public static paymentProvider: PaymentRepository;

    public static providePayment(): PaymentRepository {
        if (this.paymentProvider === undefined) {
            this.paymentProvider = new PaymentRepository();
        }
        return this.paymentProvider;
    }
}