export interface RentalDetail{
    id:number;
    customerId:number;
    brandName:String;
    carName:String;
    firstName:String;
    lastName:String;
    companyName:String;
    rentDate:Date;
    returnDate?:Date;
}