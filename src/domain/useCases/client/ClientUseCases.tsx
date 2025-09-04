import { ActivateUseCase } from "./ActivateUseCase";
import { CreateUseCase } from "./CreateUseCase";
import { DeleteUseCase } from "./DeleteUseCase";
import { FindActiveUseCase } from "./FindActiveUseCase";
import { FindAllUseCase } from "./FindAllUseCase";
import { UpdateUseCase } from "./UpdateUseCase";

export class ClientUseCases{
  findAll :FindAllUseCase;
  create:CreateUseCase;
  update:UpdateUseCase;
  deleteClient:DeleteUseCase;
  activate:ActivateUseCase;
  findActive:FindActiveUseCase;
  constructor({
    findAll,
    create,
    update,
    deleteClient,
    activate,
    findActive
  }:{
    findAll:FindAllUseCase,
    create:CreateUseCase,
    update:UpdateUseCase,
    deleteClient:DeleteUseCase,
    activate:ActivateUseCase
    findActive:FindActiveUseCase,
  }){

  this.findAll = findAll;
  this.create = create;
  this.update = update;
  this.deleteClient = deleteClient;
  this.activate = activate;
  this.findActive = findActive;
  }
}