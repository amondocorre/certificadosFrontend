
import { MenuItem, MenuResponse } from "../../../models/AccesModel";
import { ErrorResponse } from "../../../models/ErrorResponse";
import { MenuAccesRepository } from "../../../repository/configurations/MenuAccesRepositoty";

export class CreateUseCase {
  private menuAccesRepository: MenuAccesRepository;
  constructor({menuAccesRepository}:{menuAccesRepository:MenuAccesRepository}){
    this.menuAccesRepository = menuAccesRepository; 
  }
  async execute(acces:MenuItem):Promise<MenuResponse|ErrorResponse>{
    return await this.menuAccesRepository.create(acces);
  }
}