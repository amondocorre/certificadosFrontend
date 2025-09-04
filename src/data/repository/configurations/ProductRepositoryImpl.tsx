import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { Product, ProductResponse } from "../../../domain/models/ProductModel";
import { ProductRepository } from "../../../domain/repository/configurations/ProductRepositoty";
import { ProductService } from "../../sources/remote/services/configurations/ProductService";
export class ProductRepositoryImpl implements ProductRepository{
  private productService:ProductService;
  constructor({productService,}:{productService:ProductService}){
    this.productService = productService;
  }
  async create(product: Product): Promise<ProductResponse | ErrorResponse> {
    return await this.productService.create(product);
  }
  async update(id:number,product: Product): Promise<ProductResponse | ErrorResponse> {
    return await this.productService.update(id,product);
  }
  async delete(id: number): Promise<ProductResponse | ErrorResponse> {
    return await this.productService.delete(id);
  }
  async activate(id: number): Promise<ProductResponse | ErrorResponse> {
    return await this.productService.activate(id);
  }
  async findAll(): Promise<ProductResponse | ErrorResponse> {
    return await this.productService.findAll();
  }
  async findActive(): Promise<ProductResponse | ErrorResponse> {
    return await this.productService.findActive();
  }
}