import { MenuItem, MenuResponse } from "../../../domain/models/AccesModel";
import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { MenuAccesRepository } from "../../../domain/repository/configurations/MenuAccesRepositoty";
import { MenuAccesService } from "../../sources/remote/services/configurations/MenuAccesService";
export class MenuAccesRepositoryImpl implements MenuAccesRepository{
  private menuAccesService:MenuAccesService;
  constructor(
    {
      menuAccesService,
    }:{
      menuAccesService:MenuAccesService
    }){
    this.menuAccesService = menuAccesService;
  }
  async activate(id: string): Promise<MenuResponse | ErrorResponse> {
    return await this.menuAccesService.activate(id);
  }
  async findActive(): Promise<MenuResponse | ErrorResponse> {
    return await this.menuAccesService.findActive();
  }
  async create(acces: MenuItem): Promise<MenuResponse | ErrorResponse> {
    return await this.menuAccesService.create(acces);
  }
  async update(id: string, acces: MenuItem): Promise<MenuResponse | ErrorResponse> {
    return await this.menuAccesService.update(id,acces);
  }
  async delete(id: string): Promise<MenuResponse | ErrorResponse> {
    return await this.menuAccesService.delete(id);
  }
  async findAll(): Promise<MenuResponse | ErrorResponse> {
    return await this.menuAccesService.findAll();
  }
  
}