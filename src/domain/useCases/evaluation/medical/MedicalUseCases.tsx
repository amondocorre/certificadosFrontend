import { CreateUseCase } from "./CreateUseCase";
import { FindIdentityUseCase } from "./FindIdentityUseCase";
import { SearchUseCase } from "./SearchUseCase";
import { UpdateUseCase } from "./UpdateUseCase";

export class MedicalUseCases{
create:CreateUseCase;
update:UpdateUseCase;
search:SearchUseCase
findIdentity:FindIdentityUseCase
  constructor({
    create,
    update,
    search,
    findIdentity
  }:{
    create:CreateUseCase,
    update:UpdateUseCase,
    search:SearchUseCase
    findIdentity:FindIdentityUseCase
  }){
  this.create = create;
  this.update = update;
  this.search = search
  this.findIdentity = findIdentity
  }
}