import { ButtonsResponse } from "../../models/ButtonModel";
import { ErrorResponse } from "../../models/ErrorResponse";
import { UserRepository } from "../../repository/UserRepository";

export class GetButtunsAccessUseCase {
  private userRepository: UserRepository;
  constructor({userRepository}:{userRepository:UserRepository}){
    this.userRepository = userRepository; 
  }
  async execute(idAcces:number):Promise<ButtonsResponse|ErrorResponse>{
    return await this.userRepository.getButtunsAccess(idAcces);
  }
}