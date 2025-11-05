export function base64ToFile(base64: string, filename: string): File {
  // Extrae el MIME type desde la cabecera del base64
  const [header, data] = base64.split(',');
  const mimeMatch = header.match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/png'; // fallback
  const binary = atob(data);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }

  return new File([array], filename, { type: mime });
}
export const loadImageAsBase642 = async (url: string): Promise<string | null> => {
  try {
    const baseURL = import.meta.env.VITE_URL_API;
    const response = await fetch(`${baseURL}/proxy-image/?path=${url}`);
    const blob = await response.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch(e) {
    return null;
  }
};
export const loadImageAsBase64 = async (url: string): Promise<string | null> => {
  try {
    const baseURL = import.meta.env.VITE_URL_API;
    const response = await fetch(`${baseURL}/proxy-image/?path=${url}`);
    // Verificar que el tipo MIME sea imagen
    const contentType = response.headers.get('Content-Type');
    if (!contentType || !contentType.startsWith('image/')) {
      console.warn('Contenido no es imagen:', contentType);
      return null;
    }
    const blob = await response.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        // Validar que el base64 no contenga HTML
        if (result.includes('<html') || result.includes('<!DOCTYPE html')) {
          resolve(null);
        } else {
          resolve(result);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    return null;
  }
};

export const getBase64List = async(imagePaths:string[])=>{
  const baseURL = import.meta.env.VITE_URL_API;
const response = await fetch(`${baseURL}/image-batch`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ paths: imagePaths })
});

return await response.json();
}