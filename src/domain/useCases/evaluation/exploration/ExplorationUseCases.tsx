import { CreateUseCase } from "./CreateUseCase";
import { SearchUseCase } from "./SearchUseCase";

export class ExplorationUseCases{
create:CreateUseCase;
search:SearchUseCase;
  constructor({
    create,
    search,
  }:{
    create:CreateUseCase,
    search:SearchUseCase,
  }){
  this.create = create;
  this.search = search;
  }
}