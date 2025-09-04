import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { PaymentMethod, PaymentMethodResponse } from "../../../domain/models/PaymentMethodModel";
import { PaymentMethodUseCases } from "../../../domain/useCases/configurations/paymentMethod/PaymentMethodUseCases";

export class PaymentMethodViewModel {
  private paymentMethodUseCases: PaymentMethodUseCases;
  constructor({paymentMethodUseCases}:{paymentMethodUseCases:PaymentMethodUseCases}){
    this.paymentMethodUseCases = paymentMethodUseCases
  }
  async findAll():Promise<PaymentMethodResponse|ErrorResponse>{
    return await this.paymentMethodUseCases.findAll.execute()
  }
  async findActive():Promise<PaymentMethodResponse|ErrorResponse>{
    return await this.paymentMethodUseCases.findActive.execute()
  }
  async create(paymentMethod:PaymentMethod):Promise<PaymentMethodResponse|ErrorResponse>{
    return await this.paymentMethodUseCases.create.execute(paymentMethod)
  }
  async update(id:number,paymentMethod:PaymentMethod):Promise<PaymentMethodResponse|ErrorResponse>{
    return await this.paymentMethodUseCases.update.execute(id,paymentMethod)
  }
  async delete(id:number):Promise<PaymentMethodResponse|ErrorResponse>{
    return await this.paymentMethodUseCases.deleteUseCase.execute(id)
  }
  async activate(id:number):Promise<PaymentMethodResponse|ErrorResponse>{
    return await this.paymentMethodUseCases.activate.execute(id)
  }
}