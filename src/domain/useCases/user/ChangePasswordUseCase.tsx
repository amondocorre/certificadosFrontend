import { ErrorResponse } from "../../models/ErrorResponse";
import { DataChangePassword,userResponse } from "../../models/User";
import { UserRepository } from "../../repository/UserRepository";

export class ChangePasswordUseCase {
  private userRepository: UserRepository;
  constructor({userRepository}:{userRepository:UserRepository}){
    this.userRepository = userRepository; 
  }
  async execute(data:DataChangePassword):Promise<userResponse|ErrorResponse>{
    return await this.userRepository.changePassword(data);
  }
}