import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { formatDateEU } from '../../utils/dateUtils';
import dayjs from 'dayjs';

interface MedicalPdfProps {
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

export const exportMedicalReportPdf = async ({
    data,
    titleDoc,
    centroMedico,
    departamento,
    municipio,
    nombreMedico,
    especialidad,
    horaInicio,
    horaFin,
}: MedicalPdfProps): Promise<void> => {
    if (!data || data.length === 0) return;
    titleDoc = titleDoc ? titleDoc : 'pdf';

    const doc = new jsPDF('landscape'); // Apaisado para acomodar las 9 columnas cómodamente

    // 1. Dibujar Encabezados
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('LISTA DE CIUDADANOS EVALUADOS', 140, 15, { align: 'center' });

    doc.setFontSize(11);
    doc.text('DEBERÁ SER LLENADO POR EL CENTRO DE SALUD - CERTIFICADO EVALUACIÓN MÉDICA', 140, 22, { align: 'center' });

    // 2. Metadatos
    const startY = 32;
    const lineSpacing = 6;
    doc.setFontSize(10);

    const metaLabels = [
        { label: 'Centro Médico:', value: centroMedico || 'Virgen del Carmen' },
        { label: 'Departamento:', value: departamento || 'Cochabamba' },
        { label: 'Municipio:', value: municipio || 'Cercado' },
        { label: 'Nombre Medico:', value: nombreMedico || '' },
        { label: 'Especialidad (*):', value: especialidad || 'Medico General' },
        { label: 'Hora Inicio:', value: horaInicio || '08:00' },
        { label: 'Hora Fin:', value: horaFin || '17:00' },
    ];

    metaLabels.forEach((item, index) => {
        const yPos = startY + (index * lineSpacing);
        doc.setFont('helvetica', 'bold');
        doc.text(item.label, 14, yPos);
        doc.setFont('helvetica', 'normal');
        doc.text(item.value, 50, yPos);
    });

    // Texto de la esquina superior derecha
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('F-M01', 270, 32, { align: 'right' });

    // Nota antes de la tabla
    const noteY = startY + (metaLabels.length * lineSpacing) + 2;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.text('(*) Medicina General, Otorrinolaringologia, Oftalmologia y Psicologia', 14, noteY);

    // 3. Preparar imágenes
    const imageUrls: string[] = [];
    data.forEach(row => {
        if (row.foto) imageUrls.push(row.foto);
    });
    const imageCache: Record<string, string> = {};
    const apiUrl = import.meta.env.VITE_URL_API || 'http://localhost/amondocorre/centromedico/certificadosBackend/api';

    // Transformar a URL relativa para evitar bloqueos CORS en el host (ej. www vs non-www)
    let baseUrl = apiUrl;
    try {
        const parsed = new URL(apiUrl);
        baseUrl = parsed.pathname;
    } catch (e) { }
    baseUrl = baseUrl.replace(/\/api\/?$/, '') + '/';

    await Promise.all(Array.from(new Set(imageUrls)).map(async (path) => {
        try {
            // Limpiar múltiples slashes comunes en las rutas guardadas (ej. //2001)
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
            console.error("Error al cargar imagen para PDF", path);
        }
    }));

    // 4. Preparar datos de la tabla
    const headers = [
        'Número',
        'Número de cédula\nde identidad',
        'Nombre(s)',
        'Primer apellido',
        'Segundo apellido',
        'Fecha de emision',
        'Fotografía',
        'APTO/\nNO APTO',
        'Descripción del impedimento\nen caso de ser NO APTO'
    ];

    const rows = data.map((rowObj, index) => {
        return [
            index + 1,
            rowObj.ci || '',
            rowObj.nombre || '',
            rowObj.ap_paterno || '',
            rowObj.ap_materno || '',
            formatDateEU(String(rowObj.fecha_evaluacion || rowObj.fecha || dayjs())),
            '', // URL a reemplazar por la imagen en didDrawCell, se envía vacío para no imprimir el string
            rowObj.resultado_evaluacion || '',
            rowObj.motivo_resultado || ''
        ];
    });

    // 5. Dibujar Tabla
    autoTable(doc, {
        startY: noteY + 5,
        head: [headers],
        body: rows,
        styles: {
            fontSize: 8,
            lineColor: [0, 0, 0],
            lineWidth: 0.1,
            valign: 'middle',
            halign: 'center',
        },
        headStyles: {
            fillColor: [31, 108, 250], // Coincidir con el fondo original
            textColor: 255,
            halign: 'center',
        },
        bodyStyles: {
            minCellHeight: 15,
        },
        columnStyles: {
            6: { cellWidth: 16 } // Columna de fotografía
        },
        didDrawCell: (dataCell) => {
            // La foto está en la columna índice 6
            if (dataCell.section === 'body' && dataCell.column.index === 6) {
                const urlPath = data[dataCell.row.index]?.foto;
                if (!urlPath) return;

                const base64 = imageCache[urlPath];
                if (base64) {
                    const imgSize = 12;
                    const x = dataCell.cell.x + (dataCell.cell.width - imgSize) / 2;
                    const y = dataCell.cell.y + (dataCell.cell.height - imgSize) / 2;
                    try {
                        const cleanBase64 = base64.replace(/^data:image\/\w+;base64,/, '');
                        doc.addImage(cleanBase64, 'PNG', x, y, imgSize, imgSize);
                    } catch (e) { }
                }
            }
        }
    });

    // 6. Pie de página debajo de la tabla
    const finalY = (doc as any).lastAutoTable.finalY || (doc.internal.pageSize.height - 30);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Se recuerda que las evaluaciones medicas son integrales por tanto en un día todos deben ser terminadas, caso contrario pasar al día siguiente.', 14, finalY + 10);

    doc.save(`${titleDoc}.pdf`);
};
