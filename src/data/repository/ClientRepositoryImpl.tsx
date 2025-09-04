import { Client, ClientResponse } from "../../domain/models/ClientModel";
import { ErrorResponse } from "../../domain/models/ErrorResponse";
import { ClientRepository } from "../../domain/repository/ClientRepositoty";
import { ClientService } from "../sources/remote/services/ClientService";

export class ClientRepositoryImpl implements ClientRepository{
  private clientService:ClientService;
  constructor(
    {
      clientService,
    }:{
      clientService:ClientService
    }){
    this.clientService = clientService;
  }
  async create(client: Client): Promise<ClientResponse | ErrorResponse> {
    return await this.clientService.create(client);
  }
  async update(client: Client): Promise<ClientResponse | ErrorResponse> {
    return await this.clientService.update(client);
  }
  async delete(id: number): Promise<ClientResponse | ErrorResponse> {
    return await this.clientService.delete(id);
  }
  async activate(id: number): Promise<ClientResponse | ErrorResponse> {
    return await this.clientService.activate(id);
  }
  async findAll(): Promise<ClientResponse | ErrorResponse> {
    return await this.clientService.findAll();
  }
  async findActive(): Promise<ClientResponse | ErrorResponse> {
    return await this.clientService.findActive();
  }
}