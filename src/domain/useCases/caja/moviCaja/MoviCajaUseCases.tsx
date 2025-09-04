import { ActivateUseCase } from "./ActivateUseCase";
import { CreateUseCase } from "./CreateUseCase";
import { DeleteUseCase } from "./DeleteUseCase";
import { FindFilterUseCase } from "./FindFilterUseCase";
import { FindAllUseCase } from "./FindAllUseCase";
import { UpdateUseCase } from "./UpdateUseCase";

export class MoviCajaUseCases{
  findAll :FindAllUseCase;
  create:CreateUseCase;
  update:UpdateUseCase;
  deleteUseCase:DeleteUseCase;
  activate:ActivateUseCase;
  findFilter:FindFilterUseCase;
  constructor({
    findAll,
    create,
    update,
    deleteUseCase,
    activate,
    findFilter
  }:{
    findAll:FindAllUseCase,
    create:CreateUseCase,
    update:UpdateUseCase,
    deleteUseCase:DeleteUseCase,
    activate:ActivateUseCase
    findFilter:FindFilterUseCase,
  }){

  this.findAll = findAll;
  this.create = create;
  this.update = update;
  this.deleteUseCase = deleteUseCase;
  this.activate = activate;
  this.findFilter = findFilter;
  }
}