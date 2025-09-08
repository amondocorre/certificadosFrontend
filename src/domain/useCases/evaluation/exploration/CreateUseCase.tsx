
import { ErrorResponse } from "../../../models/ErrorResponse";
import { Exploration, ExplorationResponse } from "../../../models/Evaluation";
import { ExplorationRepository } from "../../../repository/evaluation/ExplorationRepositoty";

export class CreateUseCase {
  private explorationRepository: ExplorationRepository;
  constructor({explorationRepository}:{explorationRepository:ExplorationRepository}){
    this.explorationRepository = explorationRepository; 
  }
  async execute(exploration:Exploration):Promise<ExplorationResponse|ErrorResponse>{
    return await this.explorationRepository.create(exploration);
  }
}