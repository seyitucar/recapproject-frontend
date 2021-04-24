export interface Rental{
    id:number;
    carId:number;
    modelYear:number,
    description:string,
    dailyPrice:number,
    brandName:string;
    carName:string;
    firstName:string;
    lastName:string;
    companyName:string;
    rentDate:Date;
    returnDate?:Date;
}