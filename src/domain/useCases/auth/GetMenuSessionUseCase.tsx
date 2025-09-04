import { MenuItem, NavigationItem} from "../../models/AccesModel";
import { AuthRepository } from "../../repository/AuthRepository";

export class GetMenuSessionUseCase {
  private authRepository: AuthRepository;
  constructor({authRepository}:{authRepository:AuthRepository}){
    this.authRepository = authRepository; 
  }
  async execute():Promise<MenuItem[]>{
    return await this.authRepository.getMenuSession();
  }
}