import { ErrorResponse } from "../../models/ErrorResponse";
import { PaymentMethod, PaymentMethodResponse } from "../../models/PaymentMethodModel";

export interface PaymentMethodRepository{ 
  findActive():Promise<PaymentMethodResponse|ErrorResponse>;
  findAll():Promise<PaymentMethodResponse|ErrorResponse>;
  create(paymentMethod:PaymentMethod):Promise<PaymentMethodResponse|ErrorResponse>;
  update(id:number,paymentMethod:PaymentMethod):Promise<PaymentMethodResponse|ErrorResponse>;
  delete(id:number):Promise<PaymentMethodResponse|ErrorResponse>;
  activate(id:number):Promise<PaymentMethodResponse|ErrorResponse>;
}