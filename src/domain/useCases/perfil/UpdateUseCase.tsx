
import { ErrorResponse } from "../../models/ErrorResponse";
import { Perfil, PerfilResponse } from "../../models/PerfilModel";
import { PerfilRepository } from "../../repository/PerfilRepositoty";

export class UpdateUseCase {
  private perfilRepository: PerfilRepository;
  constructor({perfilRepository}:{perfilRepository:PerfilRepository}){
    this.perfilRepository = perfilRepository; 
  }
  async execute(id:string,perfil:Perfil):Promise<PerfilResponse|ErrorResponse>{
    return await this.perfilRepository.update(id,perfil);
  }
}