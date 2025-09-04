import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { Product, ProductResponse } from "../../../domain/models/ProductModel";
import { ProductUseCases } from "../../../domain/useCases/configurations/product/ProductUseCases";

export class ProductViewModel {
  private productUseCases: ProductUseCases;
  constructor({productUseCases}:{productUseCases:ProductUseCases}){
    this.productUseCases = productUseCases
  }
  async findAll():Promise<ProductResponse|ErrorResponse>{
    return await this.productUseCases.findAll.execute()
  }
  async findActive():Promise<ProductResponse|ErrorResponse>{
    return await this.productUseCases.findActive.execute()
  }
  async create(product:Product):Promise<ProductResponse|ErrorResponse>{
    return await this.productUseCases.create.execute(product)
  }
  async update(id:number,product:Product):Promise<ProductResponse|ErrorResponse>{
    return await this.productUseCases.update.execute(id,product)
  }
  async delete(id:number):Promise<ProductResponse|ErrorResponse>{
    return await this.productUseCases.deleteUseCase.execute(id)
  }
  async activate(id:number):Promise<ProductResponse|ErrorResponse>{
    return await this.productUseCases.activate.execute(id)
  }
}