import { ErrorResponse } from "../../models/ErrorResponse";
import { User, userResponse } from "../../models/User";
import { UserRepository } from "../../repository/UserRepository";

export class UpdateUseCase {
  private userRepository: UserRepository;
  constructor({userRepository}:{userRepository:UserRepository}){
    this.userRepository = userRepository; 
  }
  async execute(user:User,id_usuario:number):Promise<userResponse|ErrorResponse>{
    return await this.userRepository.update(user,id_usuario);
  }
}