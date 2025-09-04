export function hexToRgba(hex:string, alpha = 1) {
  // Asegúrate de que el string hexadecimal sea válido
  if (hex.length === 4) {
      hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3]; // Expande formatos como #0F0
  }
  const r = parseInt(hex.slice(1, 3), 16); // Valor rojo
  const g = parseInt(hex.slice(3, 5), 16); // Valor verde
  const b = parseInt(hex.slice(5, 7), 16); // Valor azul
  return `rgba(${r}, ${g}, ${b}, ${alpha})`; // Devuelve el formato rgba
}
export const hexToHsl = (hex: string) => {
const r = parseInt(hex.slice(1, 3), 16) / 255;
const g = parseInt(hex.slice(3, 5), 16) / 255;
const b = parseInt(hex.slice(5, 7), 16) / 255;

const max = Math.max(r, g, b);
const min = Math.min(r, g, b);
let h = 0, s = 0, l = (max + min) / 2;

if (max !== min) {
  const d = max - min;
  s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  switch (max) {
    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
    case g: h = (b - r) / d + 2; break;
    case b: h = (r - g) / d + 4; break;
  }
  h /= 6;
}

return {
  h: Math.round(h * 360),
  s: Math.round(s * 100),
  l: Math.round(l * 100)
};
};

// Función para convertir HSL a HEX
export const hslToHex = (h: number, s: number, l: number) => {
const a = s * Math.min(l / 100, 1 - l / 100) / 100;
const f = (n: number) => {
  const k = (n + h / 30) % 12;
  const color = l / 100 - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  return Math.round(255 * color).toString(16).padStart(2, '0');
};
return `#${f(0)}${f(8)}${f(4)}`;
};
export const adjustHslLuminosity = (hsl: { h: number; s: number; l: number }, adjustment: number): string => {
const { h, s, l } = hsl;
const newLuminosity = Math.min(Math.max(l + adjustment, 0), 100);
return hslToHex(h, s, newLuminosity);
};