
import { AccesUserResponse } from "../../../domain/models/AccesModel";
import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { AccesUserRepository } from "../../../domain/repository/security/AccesUserRepositoty";
import { AccesUserService } from "../../sources/remote/services/security/AccesUserService";
export class AccesUserRepositoryImpl implements AccesUserRepository{
  private accesUserService:AccesUserService;
  constructor(
    {
      accesUserService,
    }:{
      accesUserService:AccesUserService
    }){
    this.accesUserService = accesUserService;
  }
  async findByUser(idUser:number): Promise<AccesUserResponse | ErrorResponse> {
    return await this.accesUserService.findByUser(idUser);
  }
  async update(idAcces:number,idUser:number,estado:number,buttons:string[]): Promise<AccesUserResponse | ErrorResponse> {
    return await this.accesUserService.update(idAcces,idUser,estado,buttons);
  }/*
  async findAll(): Promise<AccesUserResponse | ErrorResponse> {
    return await this.accesUserService.findAll();
  }
  async create(button: Button): Promise<AccesUserResponse | ErrorResponse> {
    return await this.accesUserService.create(button);
  }
  async delete(id: string): Promise<AccesUserResponse | ErrorResponse> {
    return await this.accesUserService.delete(id);
  }*/
  
}