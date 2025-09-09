import { ErrorResponse } from "../../../domain/models/ErrorResponse";
import { Exploration, ExplorationResponse } from "../../../domain/models/Evaluation";
import { ExplorationUseCases } from "../../../domain/useCases/evaluation/exploration/ExplorationUseCases";

export class ExplorationViewModel {
  private explorationUseCases: ExplorationUseCases;
  constructor({explorationUseCases}:{explorationUseCases:ExplorationUseCases}){
    this.explorationUseCases = explorationUseCases
  }
  async create(exploration:Exploration):Promise<ExplorationResponse|ErrorResponse>{
    return await this.explorationUseCases.create.execute(exploration)
  }
  async search(exploration:Exploration):Promise<ExplorationResponse|ErrorResponse>{
    return await this.explorationUseCases.search.execute(exploration)
  }
}