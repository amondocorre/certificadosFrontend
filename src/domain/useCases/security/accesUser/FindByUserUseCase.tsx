
import { AccesUserResponse } from "../../../models/AccesModel";
import { ErrorResponse } from "../../../models/ErrorResponse";
import { AccesUserRepository } from "../../../repository/security/AccesUserRepositoty";

export class FindByUserUseCase {
  private accesUserRepository: AccesUserRepository;
    constructor({accesUserRepository}:{accesUserRepository:AccesUserRepository}){
      this.accesUserRepository = accesUserRepository; 
    }
    async execute(idUser:number):Promise<AccesUserResponse|ErrorResponse>{
      return await this.accesUserRepository.findByUser(idUser);
    }
}