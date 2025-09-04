
import { AccesProfileService } from "../../../../data/sources/remote/services/security/AccesProfileService";
import { AccesUserResponse } from "../../../models/AccesModel";
import { ErrorResponse } from "../../../models/ErrorResponse";

export class FindByProfileUseCase {
  private accesProfileService: AccesProfileService;
    constructor({accesProfileService}:{accesProfileService:AccesProfileService}){
      this.accesProfileService = accesProfileService; 
    }
    async execute(idProfile:string):Promise<AccesUserResponse|ErrorResponse>{
      return await this.accesProfileService.findByProfile(idProfile);
    }
}