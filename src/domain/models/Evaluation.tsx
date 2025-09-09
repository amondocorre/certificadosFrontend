export interface Exploration{
  descripcion:      string,
  tipo:             'cara'|'cuello'|'cabeza'|'torax'|'cardiopolmunar'|'abdomen' |'oido_externo'
}
export interface ExplorationResponse{
  status:string;
  message?:string;
  data:Exploration[] |[]|Exploration;
} 