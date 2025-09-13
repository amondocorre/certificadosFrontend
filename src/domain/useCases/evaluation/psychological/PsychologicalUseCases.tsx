import { CreateUseCase } from "./CreateUseCase";
import { SearchUseCase } from "./SearchUseCase";
import { UpdateUseCase } from "./UpdateUseCase";

export class PsychologicalUseCases{
create:CreateUseCase;
update:UpdateUseCase;
search:SearchUseCase
  constructor({
    create,
    update,
    search,
  }:{
    create:CreateUseCase,
    update:UpdateUseCase,
    search:SearchUseCase
  }){
  this.create = create;
  this.update = update;
  this.search = search
  }
}