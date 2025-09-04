import { CreateUseCase } from "./CreateUseCase";
import { DeleteUseCase } from "./DeleteUseCase";
import { FindActiveUseCase } from "./FindActiveUseCase";
import { FindAllUseCase } from "./FindAllUseCase";
import { UpdateUseCase } from "./UpdateUseCase";
export class ButtonUseCases{
  findAll :FindAllUseCase;
  create:CreateUseCase;
  update:UpdateUseCase;
  deleteButton:DeleteUseCase;
  findActive:FindActiveUseCase;
  constructor({
    findAll,
    create,
    update,
    deleteButton,
    findActive
  }:{
    findAll:FindAllUseCase,
    create:CreateUseCase,
    update:UpdateUseCase,
    deleteButton:DeleteUseCase,
    findActive:FindActiveUseCase,
  }){

  this.findAll = findAll;
  this.create = create;
  this.update = update;
  this.deleteButton = deleteButton;
  this.findActive = findActive;
  }
}