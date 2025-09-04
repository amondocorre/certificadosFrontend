import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { Combo, ComboResponse } from "../../../domain/models/ComboModel";
import { ComboRepository } from "../../../domain/repository/configurations/ComboRepositoty";
import { ComboService } from "../../sources/remote/services/configurations/ComboService";
export class ComboRepositoryImpl implements ComboRepository{
  private comboService:ComboService;
  constructor(
    {
      comboService,
    }:{
      comboService:ComboService
    }){
    this.comboService = comboService;
  }
  async create(combo: Combo): Promise<ComboResponse | ErrorResponse> {
    return await this.comboService.create(combo);
  }
  async update(id:number,combo: Combo): Promise<ComboResponse | ErrorResponse> {
    return await this.comboService.update(id,combo);
  }
  async delete(id: number): Promise<ComboResponse | ErrorResponse> {
    return await this.comboService.delete(id);
  }
  async activate(id: number): Promise<ComboResponse | ErrorResponse> {
    return await this.comboService.activate(id);
  }
  async findAll(): Promise<ComboResponse | ErrorResponse> {
    return await this.comboService.findAll();
  }
  async findActive(): Promise<ComboResponse | ErrorResponse> {
    return await this.comboService.findActive();
  }
}