import { ErrorResponse } from "../../models/ErrorResponse";
import { userResponse } from "../../models/User";
import { UserRepository } from "../../repository/UserRepository";

export class ResetPasswordUseCase {
  private userRepository: UserRepository;
  constructor({userRepository}:{userRepository:UserRepository}){
    this.userRepository = userRepository; 
  }
  async execute(id_usuario:number):Promise<userResponse|ErrorResponse>{
    return await this.userRepository.resetPassword(id_usuario);
  }
}