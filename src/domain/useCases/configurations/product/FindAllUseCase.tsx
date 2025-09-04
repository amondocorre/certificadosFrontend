import { ErrorResponse } from "../../../models/ErrorResponse";
import { ProductResponse } from "../../../models/ProductModel";
import { ProductRepository } from "../../../repository/configurations/ProductRepositoty";

export class FindAllUseCase {
  private productRepository: ProductRepository;
  constructor({productRepository}:{productRepository:ProductRepository}){
    this.productRepository = productRepository; 
  }
  async execute():Promise<ProductResponse|ErrorResponse>{
    return await this.productRepository.findAll();
  }
}