import { ErrorResponse } from "../../models/ErrorResponse";
import { User, userResponse } from "../../models/User";
import { UserRepository } from "../../repository/UserRepository";

export class DeleteUseCase {
  private userRepository: UserRepository;
  constructor({userRepository}:{userRepository:UserRepository}){
    this.userRepository = userRepository; 
  }
  async execute(id_usuario:number):Promise<userResponse|ErrorResponse>{
    return await this.userRepository.delete(id_usuario);
  }
}