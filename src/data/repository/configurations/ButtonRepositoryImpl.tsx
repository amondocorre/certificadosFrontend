
import { ButtonsResponse, Button } from "../../../domain/models/ButtonModel";
import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { ButtonRepository } from "../../../domain/repository/configurations/ButtonRepositoty";
import { ButtonService } from "../../sources/remote/services/configurations/ButtonService";
export class ButtonRepositoryImpl implements ButtonRepository{
  private buttonService:ButtonService;
  constructor(
    {
      buttonService,
    }:{
      buttonService:ButtonService
    }){
    this.buttonService = buttonService;
  }
  async findActive(): Promise<ButtonsResponse | ErrorResponse> {
    return await this.buttonService.findActive();
  }
  async findAll(): Promise<ButtonsResponse | ErrorResponse> {
    return await this.buttonService.findAll();
  }
  async create(button: Button): Promise<ButtonsResponse | ErrorResponse> {
    return await this.buttonService.create(button);
  }
  async update(id: string, button: Button): Promise<ButtonsResponse | ErrorResponse> {
    return await this.buttonService.update(id,button);
  }
  async delete(id: string): Promise<ButtonsResponse | ErrorResponse> {
    return await this.buttonService.delete(id);
  }
  
}