export interface CreditCard {

    id: number;
    customerId:number;
    nameSurname: string;
    cardNumber: string;
    expMonth:number;
    expYear:number;
    cvv: number;
    cardType:string;
    cardLimit:number;
}