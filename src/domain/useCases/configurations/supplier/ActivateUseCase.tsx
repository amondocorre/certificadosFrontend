import { ErrorResponse } from "../../../models/ErrorResponse";
import { SupplierResponse } from "../../../models/SupplierModel";
import { SupplierRepository } from "../../../repository/configurations/SupplierRepositoty";

export class ActivateUseCase {
  private supplierRepository: SupplierRepository;
  constructor({supplierRepository}:{supplierRepository:SupplierRepository}){
    this.supplierRepository = supplierRepository; 
  }
  async execute(id:number):Promise<SupplierResponse|ErrorResponse>{
    return await this.supplierRepository.activate(id);
  }
}