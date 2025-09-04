
import { ErrorResponse } from "../../models/ErrorResponse";
import { userResponse } from "../../models/User";
import { UserRepository } from "../../repository/UserRepository";

export class FindActiveUseCase {
  private userRepository: UserRepository;
  constructor({userRepository}:{userRepository:UserRepository}){
    this.userRepository = userRepository; 
  }
  async execute():Promise<userResponse|ErrorResponse>{
    return await this.userRepository.findActive();
  }
}