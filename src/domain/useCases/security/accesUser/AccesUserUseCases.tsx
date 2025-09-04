import { FindByUserUseCase } from "./FindByUserUseCase";
import { UpdateUseCase } from "./UpdateUseCase";
export class AccesUserUseCases{
  /*create:CreateUseCase;
  deleteButton:DeleteUseCase;
  findActive:FindActiveUseCase;*/
  update:UpdateUseCase;
  findByUser :FindByUserUseCase;
  constructor({
    findByUser,
    update,/*
    create,
    deleteButton,
    findActive*/
  }:{
    findByUser:FindByUserUseCase,
    update:UpdateUseCase,/*
    create:CreateUseCase,
    deleteButton:DeleteUseCase,
    findActive:FindActiveUseCase,*/
  }){

  this.findByUser = findByUser;
  this.update = update;/*
  this.create = create;
  this.deleteButton = deleteButton;
  this.findActive = findActive;*/
  }
}