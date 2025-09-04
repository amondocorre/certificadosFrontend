import { ErrorResponse } from "../../../models/ErrorResponse";
import { SupplierResponse } from "../../../models/SupplierModel";
import { SupplierRepository } from "../../../repository/configurations/SupplierRepositoty";

export class FindAllUseCase {
  private supplierRepository: SupplierRepository;
  constructor({supplierRepository}:{supplierRepository:SupplierRepository}){
    this.supplierRepository = supplierRepository; 
  }
  async execute():Promise<SupplierResponse|ErrorResponse>{
    return await this.supplierRepository.findAll();
  }
}