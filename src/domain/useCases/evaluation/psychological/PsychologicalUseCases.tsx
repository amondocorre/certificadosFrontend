import { CreateUseCase } from "./CreateUseCase";
import { findIdentityUseCase } from "./findIdentityUseCase";
import { SearchUseCase } from "./SearchUseCase";
import { UpdateUseCase } from "./UpdateUseCase";

export class PsychologicalUseCases{
create:CreateUseCase;
update:UpdateUseCase;
search:SearchUseCase;
findIdentity:findIdentityUseCase;
  constructor({
    create,
    update,
    search,
    findIdentity
  }:{
    create:CreateUseCase,
    update:UpdateUseCase,
    search:SearchUseCase
    findIdentity:findIdentityUseCase
  }){
  this.create = create;
  this.update = update;
  this.search = search;
  this.findIdentity = findIdentity;
  }
}