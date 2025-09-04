import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { PaymentMethod, PaymentMethodResponse } from "../../../domain/models/PaymentMethodModel";
import { PaymentMethodRepository } from "../../../domain/repository/configurations/PaymentMethodRepositoty";
import { PaymentMethodService } from "../../sources/remote/services/configurations/PaymentMethodService";
export class PaymentMethodRepositoryImpl implements PaymentMethodRepository{
  private paymentMethodService:PaymentMethodService;
  constructor(
    {
      paymentMethodService,
    }:{
      paymentMethodService:PaymentMethodService
    }){
    this.paymentMethodService = paymentMethodService;
  }
  async create(paymentMethod: PaymentMethod): Promise<PaymentMethodResponse | ErrorResponse> {
    return await this.paymentMethodService.create(paymentMethod);
  }
  async update(id:number,paymentMethod: PaymentMethod): Promise<PaymentMethodResponse | ErrorResponse> {
    return await this.paymentMethodService.update(id,paymentMethod);
  }
  async delete(id: number): Promise<PaymentMethodResponse | ErrorResponse> {
    return await this.paymentMethodService.delete(id);
  }
  async activate(id: number): Promise<PaymentMethodResponse | ErrorResponse> {
    return await this.paymentMethodService.activate(id);
  }
  async findAll(): Promise<PaymentMethodResponse | ErrorResponse> {
    return await this.paymentMethodService.findAll();
  }
  async findActive(): Promise<PaymentMethodResponse | ErrorResponse> {
    return await this.paymentMethodService.findActive();
  }
}