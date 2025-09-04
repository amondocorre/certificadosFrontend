import { asClass, createContainer } from "awilix";
import { ProductService } from "../../data/sources/remote/services/configurations/ProductService";
import { ProductRepositoryImpl } from "../../data/repository/configurations/ProductRepositoryImpl";
import { ProductUseCases } from "../../domain/useCases/configurations/product/ProductUseCases";
import { FindActiveUseCase } from "../../domain/useCases/configurations/product/FindActiveUseCase";
import { FindAllUseCase } from "../../domain/useCases/configurations/product/FindAllUseCase";
import { CreateUseCase } from "../../domain/useCases/configurations/product/CreateUseCase";
import { UpdateUseCase } from "../../domain/useCases/configurations/product/UpdateUseCase";
import { DeleteUseCase } from "../../domain/useCases/configurations/product/DeleteUseCase";
import { ActivateUseCase } from "../../domain/useCases/configurations/product/ActivateUseCase";
import { ProductViewModel } from "../../presentation/viewModel/configurations/ProductViewModel";

const productContainer = createContainer();
productContainer.register({
  // SERVICES
  productService:asClass(ProductService).singleton(),
  //REPOSITORY
  productRepository:asClass(ProductRepositoryImpl).singleton(),
  //USE CASE
  productUseCases:asClass(ProductUseCases).singleton(),
  findActive:asClass(FindActiveUseCase).singleton(),
  findAll:asClass(FindAllUseCase).singleton(),
  create:asClass(CreateUseCase).singleton(),
  update:asClass(UpdateUseCase).singleton(),
  deleteUseCase:asClass(DeleteUseCase).singleton(),
  activate:asClass(ActivateUseCase).singleton(),
  // VIEW NOMDEL
  productViewModel:asClass(ProductViewModel).singleton(),
  
})
export {productContainer};