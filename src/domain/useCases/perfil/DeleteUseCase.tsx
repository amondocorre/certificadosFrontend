
import { ErrorResponse } from "../../models/ErrorResponse";
import { PerfilResponse } from "../../models/PerfilModel";
import { PerfilRepository } from "../../repository/PerfilRepositoty";

export class DeleteUseCase {
  private perfilRepository: PerfilRepository;
  constructor({perfilRepository}:{perfilRepository:PerfilRepository}){
    this.perfilRepository = perfilRepository; 
  }
  async execute(id:string):Promise<PerfilResponse|ErrorResponse>{
    return await this.perfilRepository.delete(id);
  }
}