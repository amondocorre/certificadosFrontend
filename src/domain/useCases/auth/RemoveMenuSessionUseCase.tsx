import { AuthRepository } from "../../repository/AuthRepository";

export class RemoveMenuSessionUseCase{
  private authRepository: AuthRepository;
  constructor({authRepository}:{authRepository:AuthRepository}){
    this.authRepository = authRepository; 
  }
  async execute():Promise<void>{
    await this.authRepository.removeMenuSesion();
  }
}