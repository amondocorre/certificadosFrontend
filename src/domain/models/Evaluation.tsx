export interface Exploration{
  descripcion:      string,
  tipo:             'cara'|'cuello'|'cabeza'
}
export interface ExplorationResponse{
  status:string;
  message?:string;
  data:Exploration[] |[]|Exploration;
} 