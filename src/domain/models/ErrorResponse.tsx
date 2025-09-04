interface ErrorResponse {
  statusCode: number;
  error?: string;
  message: string | string[];
}

const defaultErrerResponse: ErrorResponse = {
  statusCode: 500,
  error: 'Error desconocido',
  message: 'Ha ocurrido un error desconocido, intente otra vez',
};

export { defaultErrerResponse };
export type { ErrorResponse }; // Cambia la exportación aquí