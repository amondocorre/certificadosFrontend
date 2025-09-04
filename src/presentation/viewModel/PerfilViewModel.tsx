
import { ErrorResponse } from '../../domain/models/ErrorResponse';
import { Perfil, PerfilResponse } from '../../domain/models/PerfilModel';
import { PerfilUseCases } from '../../domain/useCases/perfil/PerfilUseCases';
export class PerfilViewModel {
  private perfilUseCases: PerfilUseCases;
  constructor({perfilUseCases}:{perfilUseCases:PerfilUseCases}){
    this.perfilUseCases = perfilUseCases
  }
  async getPerfil():Promise<PerfilResponse|ErrorResponse>{
    return await this.perfilUseCases.getPerfil.execute()
  }
  async getPerfilAll():Promise<PerfilResponse|ErrorResponse>{
    return await this.perfilUseCases.getPerfilAll.execute()
  }
  async create(perfil:Perfil):Promise<PerfilResponse|ErrorResponse>{
    return await this.perfilUseCases.create.execute(perfil)
  }
  async update(id:string,perfil:Perfil):Promise<PerfilResponse|ErrorResponse>{
    return await this.perfilUseCases.update.execute(id,perfil)
  }
  async delete(id:string):Promise<PerfilResponse|ErrorResponse>{
    return await this.perfilUseCases.deletePerfil.execute(id)
  }
  async activate(id:string):Promise<PerfilResponse|ErrorResponse>{
    return await this.perfilUseCases.activate.execute(id)
  }
}