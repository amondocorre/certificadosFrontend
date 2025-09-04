
import { ErrorResponse } from "../../models/ErrorResponse";
import { PerfilResponse } from "../../models/PerfilModel";
import { PerfilRepository } from "../../repository/PerfilRepositoty";

export class GetPerfilUseCase {
  private perfilRepository: PerfilRepository;
  constructor({perfilRepository}:{perfilRepository:PerfilRepository}){
    this.perfilRepository = perfilRepository; 
  }
  async execute():Promise<PerfilResponse|ErrorResponse>{
    return await this.perfilRepository.getPerfil();
  }
}