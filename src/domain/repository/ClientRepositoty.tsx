
import { Client, ClientResponse } from "../models/ClientModel";
import { ErrorResponse } from "../models/ErrorResponse";
export interface ClientRepository{ 
  findActive():Promise<ClientResponse|ErrorResponse>;
  findAll():Promise<ClientResponse|ErrorResponse>;
  create(client:Client):Promise<ClientResponse|ErrorResponse>;
  update(client:Client):Promise<ClientResponse|ErrorResponse>;
  delete(id:number):Promise<ClientResponse|ErrorResponse>;
  activate(id:number):Promise<ClientResponse|ErrorResponse>;
}