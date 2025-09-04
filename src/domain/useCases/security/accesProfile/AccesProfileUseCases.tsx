import { FindByProfileUseCase } from "./FindByProfileUseCase";
import { UpdateUseCase } from "./UpdateUseCase";
export class AccesProfileUseCases{
  update:UpdateUseCase;
  findByProfile :FindByProfileUseCase;
  constructor({
    findByProfile,
    update,
  }:{
    findByProfile:FindByProfileUseCase,
    update:UpdateUseCase,
  }){

  this.findByProfile = findByProfile;
  this.update = update;
  }
}