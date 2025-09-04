
import { MenuResponse } from "../../../models/AccesModel";
import { ErrorResponse } from "../../../models/ErrorResponse";
import { MenuAccesRepository } from "../../../repository/configurations/MenuAccesRepositoty";

export class DeleteUseCase {
  private menuAccesRepository: MenuAccesRepository;
  constructor({menuAccesRepository}:{menuAccesRepository:MenuAccesRepository}){
    this.menuAccesRepository = menuAccesRepository; 
  }
  async execute(id:string):Promise<MenuResponse|ErrorResponse>{
    return await this.menuAccesRepository.delete(id);
  }
}