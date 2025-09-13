
export interface PrintRepository{
  printMovimientoCaja(id:number):Promise<void>
  printAperturaTurno(id:number):Promise<void>
  printCierreTurno(id:number):Promise<void>
  printEvaMedical(id:number):Promise<void>
  printEvaPsychological(id:number):Promise<void>
}