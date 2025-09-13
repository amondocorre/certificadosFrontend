
export interface PrintRepository{
  printMovimientoCaja(id:number):Promise<void>
  printAperturaTurno(id:number):Promise<void>
  printCierreTurno(id:number):Promise<void>
}