import { ErrorResponse } from "../../domain/models/ErrorResponse";
import { Perfil, PerfilResponse } from "../../domain/models/PerfilModel";
import { PerfilRepository } from "../../domain/repository/PerfilRepositoty";
import { PerfilService } from "../sources/remote/services/PerfilService";

export class PerfilRepositoryImpl implements PerfilRepository{
  private perfilService:PerfilService;
  constructor(
    {
      perfilService,
    }:{
      perfilService:PerfilService
    }){
    this.perfilService = perfilService;
  }
  async getPerfilAlll(): Promise<PerfilResponse | ErrorResponse> {
    return await this.perfilService.getPerfilAll();
  }
  async create(perfil: Perfil): Promise<PerfilResponse | ErrorResponse> {
    return await this.perfilService.create(perfil);
  }
  async update(id: string, perfil: Perfil): Promise<PerfilResponse | ErrorResponse> {
    return await this.perfilService.update(id,perfil);
  }
  async delete(id: string): Promise<PerfilResponse | ErrorResponse> {
    return await this.perfilService.delete(id);
  }
  async activate(id: string): Promise<PerfilResponse | ErrorResponse> {
    return await this.perfilService.activate(id);
  }
  async getPerfil(): Promise<PerfilResponse | ErrorResponse> {
    return await this.perfilService.getPerfil();
  }
}