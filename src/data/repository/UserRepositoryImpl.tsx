import { ButtonsResponse } from "../../domain/models/ButtonModel";
import { ErrorResponse } from "../../domain/models/ErrorResponse";
import { DataChangePassword, User, userResponse } from "../../domain/models/User";
import { UserRepository } from "../../domain/repository/UserRepository";
import { UserService } from "../sources/remote/services/UserService";

export class UserRepositoryImpl implements UserRepository{
  private userService:UserService;
  constructor(
    {
      userService
    }:{
      userService:UserService
    }){
    this.userService = userService;
  }
  async delete(id_usuario: number): Promise<userResponse | ErrorResponse> {
    return await this.userService.delete(id_usuario);
  }
  async activate(id_usuario: number): Promise<userResponse | ErrorResponse> {
    return await this.userService.activate(id_usuario);
  }
  async update(user: User, id_usuario: number): Promise<userResponse | ErrorResponse> {
    return await this.userService.update(user,id_usuario);
  }
  async create(user: User): Promise<userResponse | ErrorResponse> {
    return await this.userService.create(user);
  }
  async getAllUsers(): Promise<userResponse | ErrorResponse> {
    return await this.userService.getAllUsers();
  }
  
  async findActive(): Promise<userResponse | ErrorResponse> {
    return await this.userService.findActive();
  }
  async getButtunsAccess(idAcces: number): Promise<ButtonsResponse | ErrorResponse> {
    return await this.userService.getButtunsAccess(idAcces)
  }
  async resetPassword(id_usuario:number): Promise<userResponse | ErrorResponse> {
    return await this.userService.resetPassword(id_usuario);
  }
  async changePassword(data:DataChangePassword): Promise<userResponse | ErrorResponse> {
    return await this.userService.changePassword(data);
  }
}
