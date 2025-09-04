
import { Button, ButtonsResponse } from '../../../domain/models/ButtonModel';
import { ErrorResponse } from '../../../domain/models/ErrorResponse';
import { ButtonUseCases } from '../../../domain/useCases/configurations/button/ButtonUseCases';
export class ButtonViewModel {
  private buttonUseCases: ButtonUseCases;
  constructor({buttonUseCases}:{buttonUseCases:ButtonUseCases}){
    this.buttonUseCases = buttonUseCases
  }
  async findAll():Promise<ButtonsResponse|ErrorResponse>{
    return await this.buttonUseCases.findAll.execute()
  }
  async findActive():Promise<ButtonsResponse|ErrorResponse>{
    return await this.buttonUseCases.findActive.execute()
  }
  async create(button:Button):Promise<ButtonsResponse|ErrorResponse>{
    return await this.buttonUseCases.create.execute(button)
  }
  async update(id:string,button:Button):Promise<ButtonsResponse|ErrorResponse>{
    return await this.buttonUseCases.update.execute(id,button)
  }
  async delete(id:string):Promise<ButtonsResponse|ErrorResponse>{
    return await this.buttonUseCases.deleteButton.execute(id)
  }
}