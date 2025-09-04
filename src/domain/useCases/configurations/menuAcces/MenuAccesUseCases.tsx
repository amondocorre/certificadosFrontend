import { ActivateUseCase } from "./ActivateUseCase";
import { CreateUseCase } from "./CreateUseCase";
import { DeleteUseCase } from "./DeleteUseCase";
import { FindActiveUseCase } from "./FindActiveUseCase";
import { FindAllUseCase } from "./FindAllUseCase";
import { UpdateUseCase } from "./UpdateUseCase";

export class MenuAccesUseCases{
  findAll :FindAllUseCase;
  create:CreateUseCase;
  update:UpdateUseCase;
  deleteUseCase:DeleteUseCase;
  findActive:FindActiveUseCase;
  activate:ActivateUseCase;
  constructor({
    findAll,
    create,
    update,
    deleteUseCase,
    findActive,
    activate
  }:{
    findAll:FindAllUseCase,
    create:CreateUseCase,
    update:UpdateUseCase,
    deleteUseCase:DeleteUseCase,
    findActive:FindActiveUseCase,
    activate:ActivateUseCase
  }){

  this.findAll = findAll;
  this.create = create;
  this.update = update;
  this.deleteUseCase = deleteUseCase;
  this.findActive = findActive;
  this.activate = activate;
  }
}