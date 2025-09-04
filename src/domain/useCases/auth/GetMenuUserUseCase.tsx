import { MenuResponse } from "../../models/AccesModel";
import { ErrorResponse } from "../../models/ErrorResponse";
import { AuthRepository } from "../../repository/AuthRepository";

export class GetMenuUserUseCase {
  private authRepository: AuthRepository;
  constructor({authRepository}:{authRepository:AuthRepository}){
    this.authRepository = authRepository; 
  }
  async execute(token:string):Promise<MenuResponse|ErrorResponse>{
    return await this.authRepository.getMenuUser(token);
  }
}