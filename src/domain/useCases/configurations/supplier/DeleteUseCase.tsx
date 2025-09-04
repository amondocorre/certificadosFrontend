import { ErrorResponse } from "../../../models/ErrorResponse";
import { SupplierResponse } from "../../../models/SupplierModel";
import { SupplierRepository } from "../../../repository/configurations/SupplierRepositoty";

export class DeleteUseCase {
  private supplierRepository: SupplierRepository;
  constructor({supplierRepository}:{supplierRepository:SupplierRepository}){
    this.supplierRepository = supplierRepository; 
  }
  async execute(id:number):Promise<SupplierResponse|ErrorResponse>{
    return await this.supplierRepository.delete(id);
  }
}