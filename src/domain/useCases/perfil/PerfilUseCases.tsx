import { ActivateUseCase } from "./ActivateUseCase";
import { CreateUseCase } from "./CreateUseCase";
import { DeleteUseCase } from "./DeleteUseCase";
import { GetPerfilAllUseCase } from "./GetPerfilAllUseCase";
import { GetPerfilUseCase } from "./GetPerfilUseCase";
import { UpdateUseCase } from "./UpdateUseCase";

export class PerfilUseCases{
getPerfil :GetPerfilUseCase;
create:CreateUseCase;
update:UpdateUseCase;
deletePerfil:DeleteUseCase;
getPerfilAll:GetPerfilAllUseCase;
activate:ActivateUseCase
  constructor({
    getPerfil,
    create,
    update,
    deletePerfil,
    getPerfilAll,
    activate,
  }:{
    getPerfil:GetPerfilUseCase,
    create:CreateUseCase,
    update:UpdateUseCase,
    deletePerfil:DeleteUseCase,
    getPerfilAll:GetPerfilAllUseCase,
    activate:ActivateUseCase
  }){

  this.getPerfil = getPerfil;
  this.create = create;
  this.update = update;
  this.deletePerfil = deletePerfil;
  this.getPerfilAll = getPerfilAll;
  this.activate= activate
  }
}