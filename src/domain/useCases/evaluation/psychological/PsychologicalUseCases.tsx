import { ActivateUseCase } from "./ActivateUseCase";
import { CreateUseCase } from "./CreateUseCase";
import { findIdentityUseCase } from "./FindIdentityUseCase";
import { SearchUseCase } from "./SearchUseCase";
import { UpdateUseCase } from "./UpdateUseCase";

export class PsychologicalUseCases{
create:CreateUseCase;
update:UpdateUseCase;
search:SearchUseCase;
findIdentity:findIdentityUseCase;
activate:ActivateUseCase
  constructor({
    create,
    update,
    search,
    findIdentity,
    activate,
  }:{
    create:CreateUseCase,
    update:UpdateUseCase,
    search:SearchUseCase
    findIdentity:findIdentityUseCase
    activate:ActivateUseCase
  }){
  this.create = create;
  this.update = update;
  this.search = search;
  this.findIdentity = findIdentity;
  this.activate = activate;
  }
}