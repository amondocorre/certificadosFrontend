
import { AddSucursalesUseCase } from "./AddSucursalesUseCase";
import { FindAllUseCase } from "./FindAllUseCase";
import { GetSucursalesUserUseCase } from "./GetSucursalesUserUseCase";

export class SucursalUserUseCases{
  findAll :FindAllUseCase;
  addSucursales:AddSucursalesUseCase;
  getSucursalesUser:GetSucursalesUserUseCase;
  constructor({
    findAll,
    addSucursales,
    getSucursalesUser,
  }:{
    findAll:FindAllUseCase,
    addSucursales:AddSucursalesUseCase,
    getSucursalesUser:GetSucursalesUserUseCase,
  }){

  this.findAll = findAll;
  this.addSucursales = addSucursales;
  this.getSucursalesUser = getSucursalesUser;
  }
}