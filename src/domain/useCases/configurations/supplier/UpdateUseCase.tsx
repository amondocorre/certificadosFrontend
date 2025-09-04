import { ErrorResponse } from "../../../models/ErrorResponse";
import { Supplier, SupplierResponse } from "../../../models/SupplierModel";
import { SupplierRepository } from "../../../repository/configurations/SupplierRepositoty";

export class UpdateUseCase {
  private supplierRepository: SupplierRepository;
  constructor({supplierRepository}:{supplierRepository:SupplierRepository}){
    this.supplierRepository = supplierRepository; 
  }
  async execute(id:number,supplier:Supplier):Promise<SupplierResponse|ErrorResponse>{
    return await this.supplierRepository.update(id,supplier);
  }
}