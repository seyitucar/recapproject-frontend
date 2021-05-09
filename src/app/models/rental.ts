export interface Rental{
    id:number;
    carId:number;
    customerId:number;
    modelYear:number;
    description:string;
    dailyPrice:number;
    brandName:String;
    carName:String;
    firstName:String;
    lastName:String;
    companyName:String;
    rentDate:Date;
    returnDate?:Date;
}