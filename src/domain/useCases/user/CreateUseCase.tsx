import { ErrorResponse } from "../../models/ErrorResponse";
import { User, userResponse } from "../../models/User";
import { UserRepository } from "../../repository/UserRepository";

export class CreateUseCase {
  private userRepository: UserRepository;
  constructor({userRepository}:{userRepository:UserRepository}){
    this.userRepository = userRepository; 
  }
  async execute(user:User):Promise<userResponse|ErrorResponse>{
    return await this.userRepository.create(user);
  }
}