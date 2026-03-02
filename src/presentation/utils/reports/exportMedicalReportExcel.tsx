import ExcelJS from 'exceljs';
import { getBase64List } from '../fileUtils';
import { formatDateEU } from '../../utils/dateUtils';
import dayjs from 'dayjs';

interface MedicalExcelProps {
    data: Record<string, any>[];
    titleDoc: string;
    centroMedico?: string;
    departamento?: string;
    municipio?: string;
    nombreMedico?: string;
    especialidad?: string;
    horaInicio?: string;
    horaFin?: string;
}

const CONFIG = {
    IMAGE_HEIGHT: 60,
    IMAGE_WIDTH: 60,
    ROW_HEIGHT_MULTIPLIER: 0.75,
} as const;

export const exportMedicalReportExcel = async ({
    data,
    titleDoc,
    centroMedico,
    departamento,
    municipio,
    nombreMedico,
    especialidad,
    horaInicio,
    horaFin,
}: MedicalExcelProps): Promise<void> => {
    if (!data?.length) return;

    // 1. Obtener la plantilla desde la carpeta public del frontend
    const baseUrl = import.meta.env.VITE_BASE_NAME || '/';
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const templateUrl = `${cleanBaseUrl}/PLANILLAS2026.xlsx`;

    const response = await fetch(templateUrl);
    if (!response.ok) {
        throw new Error(`Error al cargar la plantilla: ${response.status} ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);
    const worksheet = workbook.getWorksheet(1);
    if (!worksheet) throw new Error("Plantilla inválida");

    // 2. Establecer encabezados
    worksheet.getCell('C3').value = centroMedico || 'Virgen del Carmen';
    worksheet.getCell('C4').value = departamento || 'Cochabamba';
    worksheet.getCell('C5').value = municipio || 'Cercado';
    worksheet.getCell('C6').value = nombreMedico || '';
    worksheet.getCell('C7').value = especialidad || 'Medico General';
    worksheet.getCell('C8').value = horaInicio || '08:00';
    worksheet.getCell('C9').value = horaFin || '17:00';

    // 3. Preparar el pie de página
    const footerText = 'Se recuerda que las evaluaciones médicas son integrales por tanto en un día todas deben ser terminadas, caso contrario pasar al día siguiente.';
    try {
        worksheet.unMergeCells('A32:I32');
    } catch (e) { }

    // 4. Llenar los datos
    const startRow = 12;
    // Hacer la columna de "Fecha de emision" (Columna F = 6) un poco más ancha
    worksheet.getColumn(6).width = 18;
    worksheet.getColumn(8).width = 30;
    worksheet.getColumn(7).width = 10;

    const imageCache = await loadImages(data);
    const rowHeight = CONFIG.IMAGE_HEIGHT * CONFIG.ROW_HEIGHT_MULTIPLIER;

    // Escribimos sobre las filas 12 a 31. No nos importa lo que había antes, solo sobrescribimos.
    let currentRow = startRow;
    data.forEach((rowObj, index) => {
        const row = worksheet.getRow(currentRow);
        // Columnas A a I (1 a 9)
        row.getCell(1).value = index + 1;
        row.getCell(2).value = rowObj.ci || '';
        row.getCell(3).value = rowObj.nombre || '';
        row.getCell(4).value = rowObj.ap_paterno || '';
        row.getCell(5).value = rowObj.ap_materno || '';

        // Formatear la fecha si está disponible
        const rawDate = rowObj.fecha_evaluacion || rowObj.fecha || dayjs();
        row.getCell(6).value = formatDateEU(String(rawDate));

        row.getCell(7).value = ''; // espacio reservado para la imagen
        row.getCell(8).value = rowObj.resultado_evaluacion || '';
        row.getCell(9).value = rowObj.motivo_resultado || '';

        // bordes y alineacion
        for (let i = 1; i <= 9; i++) {
            const cell = row.getCell(i);
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
            };
            cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        }

        // Añadir imagen
        if (rowObj.foto && imageCache[rowObj.foto]) {
            addCenteredImage(workbook, worksheet, imageCache[rowObj.foto], 6, currentRow); // la columna 6 es G (cero-indexada para addImage)
            row.height = Math.max(rowHeight, 60); // Aumentado
        } else {
            row.height = 40; // Altura nominal aumentada
        }

        row.commit();
        currentRow++;
    });

    // Eliminar pie de página existente (por ejemplo en 32) si está ahí
    const lastTemplateRow = 35;// alto de columnas
    for (let i = currentRow; i <= lastTemplateRow; i++) {
        const row = worksheet.getRow(i);
        row.values = [];
        row.height = 15;
        for (let j = 1; j <= 10; j++) row.getCell(j).border = {};
    }

    // 5. Añadir pie de página
    const footerRowObj = worksheet.getRow(currentRow + 2);
    footerRowObj.getCell(1).value = footerText;
    footerRowObj.getCell(1).font = { bold: true };
    footerRowObj.getCell(1).alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };
    footerRowObj.height = 45; // Hacer alto para evitar corte de texto
    try {
        worksheet.unMergeCells(`A${currentRow + 2}:I${currentRow + 2}`);
    } catch (e) { }
    try {
        worksheet.mergeCells(`A${currentRow + 2}:I${currentRow + 2}`);
    } catch (e) { }
    footerRowObj.commit();

    // 6. Descargar
    await downloadWorkbook(workbook, titleDoc);
};

// Utils
async function loadImages(data: Record<string, any>[]): Promise<Record<string, string>> {
    const imageUrls = new Set<string>();
    data.forEach(row => {
        if (row.foto) imageUrls.add(row.foto);
    });
    if (imageUrls.size === 0) return {};

    const imageCache: Record<string, string> = {};
    const apiUrl = import.meta.env.VITE_URL_API || 'http://localhost/amondocorre/centromedico/certificadosBackend/api';

    // Transformar a URL relativa para evitar bloqueos CORS por www vs non-www o ssl
    let baseUrl = apiUrl;
    try {
        const parsed = new URL(apiUrl);
        baseUrl = parsed.pathname;
    } catch (e) { }
    baseUrl = baseUrl.replace(/\/api\/?$/, '') + '/';

    await Promise.all(Array.from(imageUrls).map(async (path) => {
        try {
            // Limpiar múltiples slashes en caso de que existan en data base
            const cleanPath = path.replace(/\/\/+/g, '/');
            const url = baseUrl + cleanPath;
            const res = await fetch(url);
            if (res.ok) {
                const blob = await res.blob();
                const base64 = await new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.readAsDataURL(blob);
                });
                imageCache[path] = base64;
            }
        } catch (e) {
            console.error("Error cargando imagen:", path, e);
        }
    }));
    return imageCache;
}

function addCenteredImage(workbook: ExcelJS.Workbook, worksheet: ExcelJS.Worksheet, base64: string, colIndex: number, rowNum: number): void {
    try {
        // Asegurarse de quitar el prefijo base64 por si acaso viene con "data:image/png;base64,"
        const cleanBase64 = base64.replace(/^data:image\/\w+;base64,/, '');
        const imageId = workbook.addImage({ base64: cleanBase64, extension: 'png' });
        // Posicionamos la imagen de forma simple
        worksheet.addImage(imageId, {
            tl: {
                col: colIndex + 0.1, // pequeño margen
                row: rowNum - 1 + 0.1 // cero-indexada para las filas en addImage
            },
            ext: { width: CONFIG.IMAGE_WIDTH, height: CONFIG.IMAGE_HEIGHT },
            editAs: 'oneCell',
        });
    } catch (error) {
        console.error("Error al incrustar la imagen: ", error);
    }
}

async function downloadWorkbook(workbook: ExcelJS.Workbook, titleDoc: string): Promise<void> {
    try {
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const filename = `${sanitizeFilename(titleDoc)}.xlsx`;
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } catch (error) {
        throw new Error('No se pudo descargar el archivo Excel');
    }
}

function sanitizeFilename(name: string): string {
    return name.trim().replace(/[<>:"\/\\|?*\x00-\x1f]/g, '') || 'reporte';
}
