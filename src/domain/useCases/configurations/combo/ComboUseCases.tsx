import { ActivateUseCase } from "./ActivateUseCase";
import { CreateUseCase } from "./CreateUseCase";
import { DeleteUseCase } from "./DeleteUseCase";
import { FindActiveUseCase } from "./FindActiveUseCase";
import { FindAllUseCase } from "./FindAllUseCase";
import { UpdateUseCase } from "./UpdateUseCase";

export class ComboUseCases{
  findAll :FindAllUseCase;
  create:CreateUseCase;
  update:UpdateUseCase;
  deleteUseCase:DeleteUseCase;
  activate:ActivateUseCase;
  findActive:FindActiveUseCase;
  constructor({
    findAll,
    create,
    update,
    deleteUseCase,
    activate,
    findActive
  }:{
    findAll:FindAllUseCase,
    create:CreateUseCase,
    update:UpdateUseCase,
    deleteUseCase:DeleteUseCase,
    activate:ActivateUseCase
    findActive:FindActiveUseCase,
  }){

  this.findAll = findAll;
  this.create = create;
  this.update = update;
  this.deleteUseCase = deleteUseCase;
  this.activate = activate;
  this.findActive = findActive;
  }
}