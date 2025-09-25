import { ActivateUseCase } from "./ActivateUseCase";
import { CreateUseCase } from "./CreateUseCase";
import { FindIdentityUseCase } from "./FindIdentityUseCase";
import { SearchUseCase } from "./SearchUseCase";
import { UpdateUseCase } from "./UpdateUseCase";

export class MedicalUseCases{
create:CreateUseCase;
update:UpdateUseCase;
search:SearchUseCase
findIdentity:FindIdentityUseCase
activate:ActivateUseCase
  constructor({
    create,
    update,
    search,
    findIdentity,
    activate
  }:{
    create:CreateUseCase,
    update:UpdateUseCase,
    search:SearchUseCase
    findIdentity:FindIdentityUseCase
    activate:ActivateUseCase
  }){
  this.create = create;
  this.update = update;
  this.search = search
  this.findIdentity = findIdentity
  this.activate = activate
  }
}