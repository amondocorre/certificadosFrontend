import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { Supplier, SupplierResponse } from "../../../domain/models/SupplierModel";
import { SupplierUseCases } from "../../../domain/useCases/configurations/supplier/SupplierUseCases";

export class SupplierViewModel {
  private supplierUseCases: SupplierUseCases;
  constructor({supplierUseCases}:{supplierUseCases:SupplierUseCases}){
    this.supplierUseCases = supplierUseCases
  }
  async findAll():Promise<SupplierResponse|ErrorResponse>{
    return await this.supplierUseCases.findAll.execute()
  }
  async findActive():Promise<SupplierResponse|ErrorResponse>{
    return await this.supplierUseCases.findActive.execute()
  }
  async create(supplier:Supplier):Promise<SupplierResponse|ErrorResponse>{
    return await this.supplierUseCases.create.execute(supplier)
  }
  async update(id:number,supplier:Supplier):Promise<SupplierResponse|ErrorResponse>{
    return await this.supplierUseCases.update.execute(id,supplier)
  }
  async delete(id:number):Promise<SupplierResponse|ErrorResponse>{
    return await this.supplierUseCases.deleteUseCase.execute(id)
  }
  async activate(id:number):Promise<SupplierResponse|ErrorResponse>{
    return await this.supplierUseCases.activate.execute(id)
  }
}