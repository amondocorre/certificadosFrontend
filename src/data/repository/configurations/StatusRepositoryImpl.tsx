import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { Status, StatusResponse } from "../../../domain/models/StatusModel";
import { StatusRepository } from "../../../domain/repository/configurations/StatusRepositoty";
import { StatusService } from "../../sources/remote/services/configurations/StatusService";
export class StatusRepositoryImpl implements StatusRepository{
  private statusService:StatusService;
  constructor(
    {
      statusService,
    }:{
      statusService:StatusService
    }){
    this.statusService = statusService;
  }
  async create(Status: Status): Promise<StatusResponse | ErrorResponse> {
    return await this.statusService.create(Status);
  }
  async update(id:number,Status: Status): Promise<StatusResponse | ErrorResponse> {
    return await this.statusService.update(id,Status);
  }
  async delete(id: number): Promise<StatusResponse | ErrorResponse> {
    return await this.statusService.delete(id);
  }
  async activate(id: number): Promise<StatusResponse | ErrorResponse> {
    return await this.statusService.activate(id);
  }
  async findAll(): Promise<StatusResponse | ErrorResponse> {
    return await this.statusService.findAll();
  }
  async findActive(): Promise<StatusResponse | ErrorResponse> {
    return await this.statusService.findActive();
  }
}