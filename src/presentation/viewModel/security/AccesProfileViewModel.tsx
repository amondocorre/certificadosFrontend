import { AccesUserResponse } from '../../../domain/models/AccesModel';
import { ErrorResponse } from '../../../domain/models/ErrorResponse';
import { AccesProfileUseCases } from '../../../domain/useCases/security/accesProfile/AccesProfileUseCases';
export class AccesProfileViewModel {
  private accesProfileUseCases: AccesProfileUseCases;
  constructor({accesProfileUseCases}:{accesProfileUseCases:AccesProfileUseCases}){
    this.accesProfileUseCases = accesProfileUseCases
  }
  async findByProfile(idProfile:string):Promise<AccesUserResponse|ErrorResponse>{
    return await this.accesProfileUseCases.findByProfile.execute(idProfile)
  }
  async update(idAcces:number,idProfile:string,estado:number,buttons:string[]):Promise<AccesUserResponse|ErrorResponse>{
    return await this.accesProfileUseCases.update.execute(idAcces,idProfile,estado,buttons)
  }
}