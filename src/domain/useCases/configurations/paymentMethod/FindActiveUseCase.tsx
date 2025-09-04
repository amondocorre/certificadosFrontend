import { ErrorResponse } from "../../../models/ErrorResponse";
import { PaymentMethodResponse } from "../../../models/PaymentMethodModel";
import { PaymentMethodRepository } from "../../../repository/configurations/PaymentMethodRepositoty";

export class FindActiveUseCase {
  private paymentMethodRepository: PaymentMethodRepository;
    constructor({paymentMethodRepository}:{paymentMethodRepository:PaymentMethodRepository}){
      this.paymentMethodRepository = paymentMethodRepository; 
    }
  async execute():Promise<PaymentMethodResponse|ErrorResponse>{
    return await this.paymentMethodRepository.findActive();
  }
}