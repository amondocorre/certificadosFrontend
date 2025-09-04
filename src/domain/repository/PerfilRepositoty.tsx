
import { ErrorResponse } from "../models/ErrorResponse";
import { Perfil, PerfilResponse } from "../models/PerfilModel";
export interface PerfilRepository{ 
  getPerfil():Promise<PerfilResponse|ErrorResponse>;
  getPerfilAlll():Promise<PerfilResponse|ErrorResponse>;
  create(perfil:Perfil):Promise<PerfilResponse|ErrorResponse>;
  update(id:string,perfil:Perfil):Promise<PerfilResponse|ErrorResponse>;
  delete(id:string):Promise<PerfilResponse|ErrorResponse>;
  activate(id:string):Promise<PerfilResponse|ErrorResponse>;
}