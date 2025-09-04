import { ButtonsResponse } from '../../domain/models/ButtonModel';
import { ErrorResponse } from '../../domain/models/ErrorResponse';
import { DataChangePassword, User, userResponse } from '../../domain/models/User';
import { UserUseCases } from '../../domain/useCases/user/UserUseCase';
export class UserViewModel {
  private userUseCases: UserUseCases;
  constructor({userUseCases}:{userUseCases:UserUseCases}){
    this.userUseCases = userUseCases
  }
  async findActive():Promise<userResponse|ErrorResponse>{
    return await this.userUseCases.findActive.execute()
  }
  async getAllUsers():Promise<userResponse|ErrorResponse>{
    return await this.userUseCases.getAllUsers.execute()
  }
  async getButtunsAccess(idAcces:number):Promise<ButtonsResponse|ErrorResponse>{
    return await this.userUseCases.getButtunsAccess.execute(idAcces)
  }
  async create(user:User):Promise<userResponse|ErrorResponse>{
    return await this.userUseCases.create.execute(user)
  }
  async update(user:User,id_usuario:number):Promise<userResponse|ErrorResponse>{
    return await this.userUseCases.update.execute(user,id_usuario)
  }
  async delete(id_usuario:number):Promise<userResponse|ErrorResponse>{
    return await this.userUseCases.deleteUser.execute(id_usuario)
  }
  async activate(id_usuario:number):Promise<userResponse|ErrorResponse>{
    return await this.userUseCases.activate.execute(id_usuario)
  }
  async resetPassword(id_usuario:number):Promise<userResponse|ErrorResponse>{
    return await this.userUseCases.resetPassword.execute(id_usuario)
  }
  async changePassword(data:DataChangePassword):Promise<userResponse|ErrorResponse>{
    return await this.userUseCases.changePassword.execute(data)
  }
}