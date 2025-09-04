
import { MenuResponse } from "../../../models/AccesModel";
import { ErrorResponse } from "../../../models/ErrorResponse";
import { MenuAccesRepository } from "../../../repository/configurations/MenuAccesRepositoty";

export class FindAllUseCase {
  private menuAccesRepository: MenuAccesRepository;
  constructor({menuAccesRepository}:{menuAccesRepository:MenuAccesRepository}){
    this.menuAccesRepository = menuAccesRepository; 
  }
  async execute():Promise<MenuResponse|ErrorResponse>{
    return await this.menuAccesRepository.findAll();
  }
}