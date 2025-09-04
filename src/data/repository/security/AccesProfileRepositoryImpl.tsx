
import { AccesUserResponse } from "../../../domain/models/AccesModel";
import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { AccesProfileRepository } from "../../../domain/repository/security/AccesProfileRepositoty";
import { AccesProfileService } from "../../sources/remote/services/security/AccesProfileService";
export class AccesProfileRepositoryImpl implements AccesProfileRepository{
  private accesProfileService:AccesProfileService;
  constructor(
    {
      accesProfileService,
    }:{
      accesProfileService:AccesProfileService
    }){
    this.accesProfileService = accesProfileService;
  }
  async findByProfile(idProfile:string): Promise<AccesUserResponse | ErrorResponse> {
    return await this.accesProfileService.findByProfile(idProfile);
  }
  async update(idAcces:number,idProfile:string,estado:number,buttons:string[]): Promise<AccesUserResponse | ErrorResponse> {
    return await this.accesProfileService.update(idAcces,idProfile,estado,buttons);
  }
}