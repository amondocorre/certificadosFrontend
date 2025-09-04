
import { MenuItem, MenuResponse } from "../../../models/AccesModel";
import { ErrorResponse } from "../../../models/ErrorResponse";
import { MenuAccesRepository } from "../../../repository/configurations/MenuAccesRepositoty";

export class UpdateUseCase {
  private menuAccesRepository: MenuAccesRepository;
  constructor({menuAccesRepository}:{menuAccesRepository:MenuAccesRepository}){
    this.menuAccesRepository = menuAccesRepository; 
  }
  async execute(id:string,acces:MenuItem):Promise<MenuResponse|ErrorResponse>{
    return await this.menuAccesRepository.update(id,acces);
  }
}