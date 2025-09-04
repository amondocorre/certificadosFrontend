
import { MenuItem, MenuResponse } from '../../../domain/models/AccesModel';
import { ErrorResponse } from '../../../domain/models/ErrorResponse';
import { MenuAccesUseCases } from '../../../domain/useCases/configurations/menuAcces/MenuAccesUseCases';
export class MenuAccesViewModel {
  private menuAccesUseCases: MenuAccesUseCases;
  constructor({menuAccesUseCases}:{menuAccesUseCases:MenuAccesUseCases}){
    this.menuAccesUseCases = menuAccesUseCases
  }
  async findAll():Promise<MenuResponse|ErrorResponse>{
    return await this.menuAccesUseCases.findAll.execute()
  }
  async findActive():Promise<MenuResponse|ErrorResponse>{
    return await this.menuAccesUseCases.findActive.execute()
  }
  async create(acces:MenuItem):Promise<MenuResponse|ErrorResponse>{
    return await this.menuAccesUseCases.create.execute(acces)
  }
  async update(id:string,acces:MenuItem):Promise<MenuResponse|ErrorResponse>{
    return await this.menuAccesUseCases.update.execute(id,acces)
  }
  async delete(id:string):Promise<MenuResponse|ErrorResponse>{
    return await this.menuAccesUseCases.deleteUseCase.execute(id)
  }
  async activate(id:string):Promise<MenuResponse|ErrorResponse>{
    return await this.menuAccesUseCases.activate.execute(id)
  }
}