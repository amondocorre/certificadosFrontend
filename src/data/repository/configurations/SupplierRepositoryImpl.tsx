import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { Supplier, SupplierResponse } from "../../../domain/models/SupplierModel";
import { SupplierRepository } from "../../../domain/repository/configurations/SupplierRepositoty";
import { SupplierService } from "../../sources/remote/services/configurations/SupplierService";
export class SupplierRepositoryImpl implements SupplierRepository{
  private supplierService:SupplierService;
  constructor(
    {
      supplierService,
    }:{
      supplierService:SupplierService
    }){
    this.supplierService = supplierService;
  }
  async create(supplier: Supplier): Promise<SupplierResponse | ErrorResponse> {
    return await this.supplierService.create(supplier);
  }
  async update(id:number,supplier: Supplier): Promise<SupplierResponse | ErrorResponse> {
    return await this.supplierService.update(id,supplier);
  }
  async delete(id: number): Promise<SupplierResponse | ErrorResponse> {
    return await this.supplierService.delete(id);
  }
  async activate(id: number): Promise<SupplierResponse | ErrorResponse> {
    return await this.supplierService.activate(id);
  }
  async findAll(): Promise<SupplierResponse | ErrorResponse> {
    return await this.supplierService.findAll();
  }
  async findActive(): Promise<SupplierResponse | ErrorResponse> {
    return await this.supplierService.findActive();
  }
}