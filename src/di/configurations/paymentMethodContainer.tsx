import { asClass, createContainer } from "awilix";
import { PaymentMethodService } from "../../data/sources/remote/services/configurations/PaymentMethodService";
import { PaymentMethodRepositoryImpl } from "../../data/repository/configurations/PaymentMethodRepositoryImpl";
import { PaymentMethodUseCases } from "../../domain/useCases/configurations/paymentMethod/PaymentMethodUseCases";
import { FindActiveUseCase } from "../../domain/useCases/configurations/paymentMethod/FindActiveUseCase";
import { FindAllUseCase } from "../../domain/useCases/configurations/paymentMethod/FindAllUseCase";
import { CreateUseCase } from "../../domain/useCases/configurations/paymentMethod/CreateUseCase";
import { UpdateUseCase } from "../../domain/useCases/configurations/paymentMethod/UpdateUseCase";
import { DeleteUseCase } from "../../domain/useCases/configurations/paymentMethod/DeleteUseCase";
import { ActivateUseCase } from "../../domain/useCases/configurations/paymentMethod/ActivateUseCase";
import { PaymentMethodViewModel } from "../../presentation/viewModel/configurations/PaymentMethodViewModel";

const paymentMethodContainer = createContainer();
paymentMethodContainer.register({
  // SERVICES
  paymentMethodService:asClass(PaymentMethodService).singleton(),
  //REPOSITORY
  paymentMethodRepository:asClass(PaymentMethodRepositoryImpl).singleton(),
  //USE CASE
  paymentMethodUseCases:asClass(PaymentMethodUseCases).singleton(),
  findActive:asClass(FindActiveUseCase).singleton(),
  findAll:asClass(FindAllUseCase).singleton(),
  create:asClass(CreateUseCase).singleton(),
  update:asClass(UpdateUseCase).singleton(),
  deleteUseCase:asClass(DeleteUseCase).singleton(),
  activate:asClass(ActivateUseCase).singleton(),
  // VIEW NOMDEL
  paymentMethodViewModel:asClass(PaymentMethodViewModel).singleton(),
  
})
export {paymentMethodContainer};