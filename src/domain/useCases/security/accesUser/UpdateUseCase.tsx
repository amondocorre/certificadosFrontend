
import { AccesUserResponse } from "../../../models/AccesModel";
import { ErrorResponse } from "../../../models/ErrorResponse";
import { AccesUserRepository } from "../../../repository/security/AccesUserRepositoty";

export class UpdateUseCase {
  private accesUserRepository: AccesUserRepository;
  constructor({accesUserRepository}:{accesUserRepository:AccesUserRepository}){
    this.accesUserRepository = accesUserRepository; 
  }
  async execute(idAcces:number,idUser:number,estado:number,buttons:string[]):Promise<AccesUserResponse|ErrorResponse>{
    return await this.accesUserRepository.update(idAcces,idUser,estado,buttons);
  }
}