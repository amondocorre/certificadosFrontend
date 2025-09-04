
import { apiRequestHandler } from "../../api/apiRequestHandler";

export class PrintService{
  async printMovimientoCaja(id:number): Promise<void> {
    try {
      const response = await apiRequestHandler.post('/impresion/imprimirMovimientoCaja/'+id, {}, { responseType: 'blob', });
      const contentType = response.headers['content-type'];
      if (contentType.includes('application/json')) {
        const jsonData = await response.data.text();
        console.log('Respuesta JSON:', JSON.parse(jsonData));
      } else if (contentType.includes('application/pdf')) {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        window.open(url, '_blank');
        /*const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'movimientoCaja.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);*/
      } else {
        console.warn('Formato desconocido:', contentType);
      }
    } catch (error) {
      console.error('Error al obtener la respuesta:', error);
    }
  }
  async printAperturaTurno(id:number): Promise<void> {
    try {
      const response = await apiRequestHandler.post('/impresion/imprimirAperturaTurno/'+id, {}, { responseType: 'blob', });
      const contentType = response.headers['content-type'];
      if (contentType.includes('application/json')) {
        const jsonData = await response.data.text();
        console.log('Respuesta JSON:', JSON.parse(jsonData));
      } else if (contentType.includes('application/pdf')) {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        window.open(url, '_blank');
      } else {
        console.warn('Formato desconocido:', contentType);
      }
    } catch (error) {
      console.error('Error al obtener la respuesta:', error);
    }
  }
  async printCierreTurno(id:number): Promise<void> {
    try {
      const response = await apiRequestHandler.post('/impresion/imprimirCierreTurno/'+id, {}, { responseType: 'blob', });
      const contentType = response.headers['content-type'];
      if (contentType.includes('application/json')) {
        const jsonData = await response.data.text();
        console.log('Respuesta JSON:', JSON.parse(jsonData));
      } else if (contentType.includes('application/pdf')) {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        window.open(url, '_blank');
      } else {
        console.warn('Formato desconocido:', contentType);
      }
    } catch (error) {
      console.error('Error al obtener la respuesta:', error);
    }
  }
  async printNotaVenta(id:number): Promise<void> {
    try {
      const response = await apiRequestHandler.post('/impresion/imprimirContrato/'+id, {}, { responseType: 'blob', });
      const contentType = response.headers['content-type'];
      if (contentType.includes('application/json')) {
        const jsonData = await response.data.text();
        console.log('Respuesta JSON:', JSON.parse(jsonData));
      } else if (contentType.includes('application/pdf')) {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        window.open(url, '_blank');
      } else {
        console.warn('Formato desconocido:', contentType);
      }
    } catch (error) {
      console.error('Error al obtener la respuesta:', error);
    }
  }
  async printReciboPago(id:number): Promise<void> {
    try {
      const response = await apiRequestHandler.post('/impresion/imprimirReciboPago/'+id, {}, { responseType: 'blob', });
      const contentType = response.headers['content-type'];
      if (contentType.includes('application/json')) {
        const jsonData = await response.data.text();
        console.log('Respuesta JSON:', JSON.parse(jsonData));
      } else if (contentType.includes('application/pdf')) {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        window.open(url, '_blank');
      } else {
        console.warn('Formato desconocido:', contentType);
      }
    } catch (error) {
      console.error('Error al obtener la respuesta:', error);
    }
  }
  async printReciboPagosRent(id:number): Promise<void> {
    try {
      const response = await apiRequestHandler.get('/impresion/imprimirReciboPagoContrato/'+id,{ responseType: 'blob', });
      const contentType = response.headers['content-type'];
      if (contentType.includes('application/json')) {
        const jsonData = await response.data.text();
        console.log('Respuesta JSON:', JSON.parse(jsonData));
      } else if (contentType.includes('application/pdf')) {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        window.open(url, '_blank');
      } else {
        console.warn('Formato desconocido:', contentType);
      }
    } catch (error) {
      console.error('Error al obtener la respuesta:', error);
    }
  }
  async printRecibosPagos(ids:number[]): Promise<void> {
    try {
      const response = await apiRequestHandler.post('/impresion/imprimirRecibosPagos', {pagos:ids}, { responseType: 'blob', });
      const contentType = response.headers['content-type'];
      if (contentType.includes('application/json')) {
        const jsonData = await response.data.text();
        console.log('Respuesta JSON:', JSON.parse(jsonData));
      } else if (contentType.includes('application/pdf')) {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        window.open(url, '_blank');
      } else {
        console.warn('Formato desconocido:', contentType);
      }
    } catch (error) {
      console.error('Error al obtener la respuesta:', error);
    }
  }
}