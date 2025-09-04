import { ErrorResponse } from "../../../models/ErrorResponse";
import { Supplier, SupplierResponse } from "../../../models/SupplierModel";
import { SupplierRepository } from "../../../repository/configurations/SupplierRepositoty";

export class CreateUseCase {
  private supplierRepository: SupplierRepository;
  constructor({supplierRepository}:{supplierRepository:SupplierRepository}){
    this.supplierRepository = supplierRepository; 
  }
  async execute(supplier:Supplier):Promise<SupplierResponse|ErrorResponse>{
    return await this.supplierRepository.create(supplier);
  }
}