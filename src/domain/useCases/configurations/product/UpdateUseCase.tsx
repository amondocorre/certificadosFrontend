import { ErrorResponse } from "../../../models/ErrorResponse";
import { Product, ProductResponse } from "../../../models/ProductModel";
import { ProductRepository } from "../../../repository/configurations/ProductRepositoty";

export class UpdateUseCase {
  private productRepository: ProductRepository;
  constructor({productRepository}:{productRepository:ProductRepository}){
    this.productRepository = productRepository; 
  }
  async execute(id:number,product:Product):Promise<ProductResponse|ErrorResponse>{
    return await this.productRepository.update(id,product);
  }
}