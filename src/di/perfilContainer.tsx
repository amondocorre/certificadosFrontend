import { asClass, createContainer } from "awilix";
import { PerfilService } from "../data/sources/remote/services/PerfilService";
import { PerfilRepositoryImpl } from "../data/repository/PerfilRepositoryImpl";
import { PerfilUseCases } from "../domain/useCases/perfil/PerfilUseCases";
import { PerfilViewModel } from "../presentation/viewModel/PerfilViewModel";
import { GetPerfilUseCase } from "../domain/useCases/perfil/GetPerfilUseCase";
import { GetPerfilAllUseCase } from "../domain/useCases/perfil/GetPerfilAllUseCase";
import { CreateUseCase } from "../domain/useCases/perfil/CreateUseCase";
import { UpdateUseCase } from "../domain/useCases/perfil/UpdateUseCase";
import { DeleteUseCase } from "../domain/useCases/perfil/DeleteUseCase";
import { ActivateUseCase } from "../domain/useCases/perfil/ActivateUseCase";

const perfilContainer = createContainer();
perfilContainer.register({
  // SERVICES
  perfilService:asClass(PerfilService).singleton(),
  //REPOSITORY
  perfilRepository:asClass(PerfilRepositoryImpl).singleton(),
  //USE CASE
  perfilUseCases:asClass(PerfilUseCases).singleton(),
  getPerfil:asClass(GetPerfilUseCase).singleton(),
  getPerfilAll:asClass(GetPerfilAllUseCase).singleton(),
  create:asClass(CreateUseCase).singleton(),
  update:asClass(UpdateUseCase).singleton(),
  deletePerfil:asClass(DeleteUseCase).singleton(),
  activate:asClass(ActivateUseCase).singleton(),
  // VIEW NOMDEL
  perfilViewModel:asClass(PerfilViewModel).singleton(),
  
})
export {perfilContainer};