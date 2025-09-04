import { asClass, createContainer } from "awilix";
import { SupplierService } from "../../data/sources/remote/services/configurations/SupplierService";
import { SupplierRepositoryImpl } from "../../data/repository/configurations/SupplierRepositoryImpl";
import { SupplierUseCases } from "../../domain/useCases/configurations/supplier/SupplierUseCases";
import { FindActiveUseCase } from "../../domain/useCases/configurations/supplier/FindActiveUseCase";
import { FindAllUseCase } from "../../domain/useCases/configurations/supplier/FindAllUseCase";
import { CreateUseCase } from "../../domain/useCases/configurations/supplier/CreateUseCase";
import { UpdateUseCase } from "../../domain/useCases/configurations/supplier/UpdateUseCase";
import { DeleteUseCase } from "../../domain/useCases/configurations/supplier/DeleteUseCase";
import { ActivateUseCase } from "../../domain/useCases/configurations/supplier/ActivateUseCase";
import { SupplierViewModel } from "../../presentation/viewModel/configurations/SupplierViewModel";

const supplierContainer = createContainer();
supplierContainer.register({
  // SupplierS
  supplierService:asClass(SupplierService).singleton(),
  //REPOSITORY
  supplierRepository:asClass(SupplierRepositoryImpl).singleton(),
  //USE CASE
  supplierUseCases:asClass(SupplierUseCases).singleton(),
  findActive:asClass(FindActiveUseCase).singleton(),
  findAll:asClass(FindAllUseCase).singleton(),
  create:asClass(CreateUseCase).singleton(),
  update:asClass(UpdateUseCase).singleton(),
  deleteUseCase:asClass(DeleteUseCase).singleton(),
  activate:asClass(ActivateUseCase).singleton(),
  // VIEW NOMDEL
  supplierViewModel:asClass(SupplierViewModel).singleton(),
  
})
export {supplierContainer};