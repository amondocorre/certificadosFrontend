
import { AccesUserResponse } from "../../../models/AccesModel";
import { ErrorResponse } from "../../../models/ErrorResponse";
import { AccesProfileService } from "../../../../data/sources/remote/services/security/AccesProfileService";

export class UpdateUseCase {
  private accesProfileService: AccesProfileService;
  constructor({accesProfileService}:{accesProfileService:AccesProfileService}){
    this.accesProfileService = accesProfileService; 
  }
  async execute(idAcces:number,idProfile:string,estado:number,buttons:string[]):Promise<AccesUserResponse|ErrorResponse>{
    return await this.accesProfileService.update(idAcces,idProfile,estado,buttons);
  }
}