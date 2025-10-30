export function formatDate(fechaString: string | Date | null | undefined): string | null {
  try {
    if (!fechaString) {
      return null;
    }
    let fechaFinal: Date;
    if (typeof fechaString === 'string') {
      const tieneHora = /\d{2}:\d{2}(:\d{2})?/.test(fechaString);
      const fechaConHora = tieneHora ? fechaString : `${fechaString} 12:00:00`;
      fechaFinal = new Date(fechaConHora);
    } else {
      fechaFinal = new Date(fechaString);
    }
    const year = fechaFinal.getFullYear();
    const month = (fechaFinal.getMonth() + 1).toString().padStart(2, '0');
    const day = fechaFinal.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch (error) {
    return null;
  }
}
export function formatDateDMY2(fechaString: string | Date | null | undefined): string | null {
  try {
    if (!fechaString) {
      return null;
    }
    let fechaFinal: Date;
    if (typeof fechaString === 'string') {
      const tieneHora = /\d{2}:\d{2}(:\d{2})?/.test(fechaString);
      const fechaConHora = tieneHora ? fechaString : `${fechaString} 12:00:00`;
      fechaFinal = new Date(fechaConHora);
    } else {
      fechaFinal = new Date(fechaString);
    }
    const year = fechaFinal.getFullYear();
    const month = (fechaFinal.getMonth() + 1).toString().padStart(2, '0');
    const day = fechaFinal.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${year}`;
  } catch (error) {
    return null;
  }
}
export function formatDateEU(fechaString: string | Date | null | undefined): string | null {
  try {
    if (!fechaString) {
      return null;
    }
    let fechaFinal: Date;
    if (typeof fechaString === 'string') {
      const tieneHora = /\d{2}:\d{2}(:\d{2})?/.test(fechaString);
      const fechaConHora = tieneHora ? fechaString : `${fechaString} 12:00:00`;
      fechaFinal = new Date(fechaConHora);
    } else {
      fechaFinal = new Date(fechaString);
    }
    const year = fechaFinal.getFullYear();
    const month = (fechaFinal.getMonth() + 1).toString().padStart(2, '0');
    const day = fechaFinal.getDate().toString().padStart(2, '0');
    return `${day}-${month}-${year}`;
  } catch (error) {
    return null;
  }
}
export function formatDateDMY(fechaString: string | Date | null | undefined): string | null {
  try {
    if (!fechaString) {
      return null;
    }
    let fechaFinal: Date;
    if (typeof fechaString === 'string') {
      const tieneHora = /\d{2}:\d{2}(:\d{2})?/.test(fechaString);
      const fechaConHora = tieneHora ? fechaString : `${fechaString} 12:00:00`;
      fechaFinal = new Date(fechaConHora);
    } else {
      fechaFinal = new Date(fechaString);
    }
    const year = fechaFinal.getFullYear();
    const month = (fechaFinal.getMonth() + 1).toString().padStart(2, '0');
    const day = fechaFinal.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${year}`;
  } catch (error) {
    return null;
  }
}
export function formatTime12H(fechaString: string | Date | null | undefined): string | null {
  try {
    if (!fechaString) {
      return null;
    }
    const fecha = new Date(fechaString);
    let hours = fecha.getHours();
    const minutes = fecha.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; 
    return `${hours}:${minutes} ${ampm}`;
  } catch (error) {
    return null;
  }
}
export function formatTime24H(fechaString: string | Date | null | undefined): string | null {
  try {
    if (!fechaString) {
      return null;
    }
    const fecha = new Date(fechaString);
    const hours = fecha.getHours().toString().padStart(2, '0');
    const minutes = fecha.getMinutes().toString().padStart(2, '0');
    const seconds = fecha.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`; 
  } catch (error) {
    return null;
  }
}
export function crearFechaConHora(horaString: string): string {
  const [hours, minutes, seconds] = horaString.split(":").map(Number);
  const fecha = new Date();
  fecha.setHours(hours, minutes, seconds || 0); 
  return String(fecha);
}
