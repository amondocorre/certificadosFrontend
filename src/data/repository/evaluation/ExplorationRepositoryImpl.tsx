
import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { Exploration, ExplorationResponse } from "../../../domain/models/Evaluation";
import { ExplorationRepository } from "../../../domain/repository/evaluation/ExplorationRepositoty";
import { ExplorationService } from "../../sources/remote/services/evaluation/ExplorationService";
export class ExplorationRepositoryImpl implements ExplorationRepository{
  private explorationService:ExplorationService;
  constructor(
    {
      explorationService,
    }:{
      explorationService:ExplorationService
    }){
    this.explorationService = explorationService;
  }
  
  
  async create(exploration: Exploration): Promise<ExplorationResponse | ErrorResponse> {
    return await this.explorationService.create(exploration);
  }
  async search(exploration: Exploration): Promise<ExplorationResponse | ErrorResponse> {
    return await this.explorationService.search(exploration);
  }
}