import { CustomerDetail } from "./customerDetail";
import { ResponseModel } from "./responseModel";

export interface CustomerDetailResponseModel extends ResponseModel {
    data:CustomerDetail[];
}