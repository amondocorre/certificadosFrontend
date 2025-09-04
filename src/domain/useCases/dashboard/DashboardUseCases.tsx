import { GetDetailRentUseCase } from "./GetDetailRentUseCase";
import { GetIngresosDiariosUseCase } from "./GetIngresosDiariosUseCase";
import { GetTotalesInventarioUseCase } from "./GetTotalesInventarioUseCase";
import { ListRentEntregaUseCase } from "./listRentEntregaUseCase";
import { listRentUseCase } from "./listRentUseCase";

export class DashboardUseCases{
getTotalesInventario:GetTotalesInventarioUseCase;
getIngresosDiarios:GetIngresosDiariosUseCase;
listRent:listRentUseCase;
listRentEntrega:ListRentEntregaUseCase;
getDetailRent:GetDetailRentUseCase;
  constructor({
    getTotalesInventario, 
    getIngresosDiarios,
    listRent,
    listRentEntrega,
    getDetailRent,
  }:{
    getTotalesInventario:GetTotalesInventarioUseCase,
    getIngresosDiarios:GetIngresosDiariosUseCase,
    listRent:listRentUseCase,
    listRentEntrega:ListRentEntregaUseCase,
    getDetailRent:GetDetailRentUseCase,

  }){
  this.getTotalesInventario = getTotalesInventario;
  this.getIngresosDiarios = getIngresosDiarios;
  this.listRent = listRent;
  this.listRentEntrega = listRentEntrega;
  this.getDetailRent = getDetailRent;
  }
}