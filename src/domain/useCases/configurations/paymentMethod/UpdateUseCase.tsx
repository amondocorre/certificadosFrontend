import { ErrorResponse } from "../../../models/ErrorResponse";
import { PaymentMethod, PaymentMethodResponse } from "../../../models/PaymentMethodModel";
import { PaymentMethodRepository } from "../../../repository/configurations/PaymentMethodRepositoty";

export class UpdateUseCase {
  private paymentMethodRepository: PaymentMethodRepository;
  constructor({paymentMethodRepository}:{paymentMethodRepository:PaymentMethodRepository}){
    this.paymentMethodRepository = paymentMethodRepository; 
  }
  async execute(id:number,paymentMethod:PaymentMethod):Promise<PaymentMethodResponse|ErrorResponse>{
    return await this.paymentMethodRepository.update(id,paymentMethod);
  }
}