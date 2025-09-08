
import { ErrorResponse } from "../../models/ErrorResponse";
import { Exploration, ExplorationResponse } from "../../models/Evaluation";
export interface ExplorationRepository{ 
  create(exploration:Exploration):Promise<ExplorationResponse|ErrorResponse>;
  search(exploration:Exploration):Promise<ExplorationResponse|ErrorResponse>;
}