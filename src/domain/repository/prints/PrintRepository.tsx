
export interface PrintRepository{
  printMovimientoCaja(id:number):Promise<void>
  printAperturaTurno(id:number):Promise<void>
  printCierreTurno(id:number):Promise<void>
  printNotaVenta(id:number):Promise<void>
  printReciboPago(id:number):Promise<void>
  printRecibosPagos(ids:number[]):Promise<void>
  printReciboPagosRent(id:number):Promise<void>
}