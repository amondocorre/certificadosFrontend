import { AccesUserResponse } from '../../../domain/models/AccesModel';
import { ErrorResponse } from '../../../domain/models/ErrorResponse';
import { AccesUserUseCases } from '../../../domain/useCases/security/accesUser/AccesUserUseCases';
export class AccesUserViewModel {
  private accesUserUseCases: AccesUserUseCases;
  constructor({accesUserUseCases}:{accesUserUseCases:AccesUserUseCases}){
    this.accesUserUseCases = accesUserUseCases
  }
  async findByUser(idUser:number):Promise<AccesUserResponse|ErrorResponse>{
    return await this.accesUserUseCases.findByUser.execute(idUser)
  }
  async update(idAcces:number,idUser:number,estado:number,buttons:string[]):Promise<AccesUserResponse|ErrorResponse>{
    return await this.accesUserUseCases.update.execute(idAcces,idUser,estado,buttons)
  }/*
  async findActive():Promise<AccesUserResponse|ErrorResponse>{
    return await this.accesUserUseCases.findActive.execute()
  }
  async create(button:Button):Promise<AccesUserResponse|ErrorResponse>{
    return await this.accesUserUseCases.create.execute(button)
  }
  async delete(id:string):Promise<AccesUserResponse|ErrorResponse>{
    return await this.accesUserUseCases.deleteButton.execute(id)
  }*/
}