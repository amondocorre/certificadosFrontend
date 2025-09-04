import { NavigationItem } from "../../models/AccesModel";
import { AuthRepository } from "../../repository/AuthRepository";

export class SaveMenuSessionUseCase {
  private authRepository: AuthRepository;
  constructor({authRepository}:{authRepository:AuthRepository}){
    this.authRepository = authRepository; 
  }
  async execute(navigationItem:NavigationItem):Promise<void>{
    await this.authRepository.saveMenuSesion(navigationItem);
  }
}