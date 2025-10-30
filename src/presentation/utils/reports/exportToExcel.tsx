import ExcelJS from 'exceljs';
import { getBase64List } from '../fileUtils';
interface ColumnExcel {
  accessorKey: string;
  header: string;
  isImage?: boolean;
  width?: number;
}
interface ExcelProps {
  data: Record<string, any>[];
  columns: ColumnExcel[];
  titleExcel?: string;
  titleDoc: string;
  titleSheet?: string;
}
const CONFIG = {
  IMAGE_HEIGHT: 60,
  IMAGE_WIDTH: 60,
  ROW_HEIGHT_MULTIPLIER: 0.75,
  HEADER_ROW_HEIGHT: 30,
  TITLE_FONT_SIZE: 16,
  COLUMN_PADDING: 8,
  MAX_SHEET_NAME_LENGTH: 31,
} as const;

const COLORS = {
  HEADER_BG: 'FF1F6CFA',
  HEADER_TEXT: 'FFFFFFFF',
  TITLE_TEXT: 'FF000000',
} as const;

export const exportToExcel = async ({data,columns,titleDoc,titleExcel,titleSheet }: ExcelProps): Promise<void> => {
  if (!data?.length || !columns?.length)return;

  const workbook = new ExcelJS.Workbook();
  const sheetName = sanitizeSheetName(titleSheet || 'Reporte');
  const worksheet = workbook.addWorksheet(sheetName);
  const headerRowIndex = addTitle(worksheet, titleExcel, columns.length);
  const imageCache = await loadImages(data, columns);
  // Configurar encabezados
  setupHeaders(worksheet, columns, headerRowIndex);
  // Agregar datos y aplicar estilos
  addDataRows(worksheet, data, columns, headerRowIndex, imageCache, workbook);
  // Configurar filtros y anchos de columna
  applyFiltersAndColumnWidths(worksheet, columns, headerRowIndex);
  // Exportar archivo
  await downloadWorkbook(workbook, titleDoc);
};

// Sanitiza el nombre de la hoja de Excel
function sanitizeSheetName(name: string): string {
  return name
    .trim()
    .replace(/[:\\\/\?\*\[\]]/g, '')
    .slice(0, CONFIG.MAX_SHEET_NAME_LENGTH);
}
// Agrega el título si existe y retorna el índice de la fila del header
function addTitle(worksheet: ExcelJS.Worksheet,titleExcel: string | undefined,columnsLength: number): number {
  if (!titleExcel?.trim()) return 1;
  const titleRow = worksheet.addRow([titleExcel]);
  worksheet.mergeCells(1, 1, 1, columnsLength);
  titleRow.height = CONFIG.HEADER_ROW_HEIGHT;
  titleRow.getCell(1).font = {
    bold: true,
    size: CONFIG.TITLE_FONT_SIZE,
    color: { argb: COLORS.TITLE_TEXT },
  };
  titleRow.getCell(1).alignment = { 
    vertical: 'middle', 
    horizontal: 'center' 
  };
  return 2;
}
// Carga todas las imágenes en paralelo y las cachea
async function loadImages(data: Record<string, any>[], columns: ColumnExcel[]): Promise<Record<string, string>> {
  const imageUrls = new Set<string>();
  data.forEach(row => {
    columns.forEach(col => {
      if (col.isImage && row[col.accessorKey]) {
        imageUrls.add(row[col.accessorKey]);
      }
    });
  });
  if (imageUrls.size === 0) return {};
  return await getBase64List(Array.from(imageUrls));
}
function setupHeaders(worksheet: ExcelJS.Worksheet, columns: ColumnExcel[], headerRowIndex: number): void {
  const headers = columns.map(col => col.header);
  const headerRow = worksheet.addRow(headers);
  headerRow.eachCell((cell:ExcelJS.Cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: COLORS.HEADER_BG },
    };
    cell.font = {
      bold: true,
      color: { argb: COLORS.HEADER_TEXT },
    };
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    cell.alignment = { 
      vertical: 'middle', 
      horizontal: 'center',
      wrapText: true 
    };
  });
}
//Agrega las filas de datos con imágenes y estilos
function addDataRows(worksheet: ExcelJS.Worksheet,data: Record<string, any>[],columns: ColumnExcel[],headerRowIndex: number,imageCache: Record<string, string>,workbook: ExcelJS.Workbook): void {
  const rowHeight = CONFIG.IMAGE_HEIGHT * CONFIG.ROW_HEIGHT_MULTIPLIER;
  data.forEach((row, rowIndex) => {
    const rowData = columns.map(col => {
    if (col.accessorKey === '__index') return rowIndex + 1;
      return col.isImage ? '' : (row[col.accessorKey] ?? '');
    });
    const excelRow = worksheet.addRow(rowData);
    let hasImage = false;
    columns.forEach((col, colIndex) => {
      const cell = excelRow.getCell(colIndex + 1);
      if (col.isImage && row[col.accessorKey]) {
        const url = row[col.accessorKey];
        const base64 = imageCache[url];
        if (base64) {
          hasImage = true;
          addCenteredImage(workbook, worksheet, base64, colIndex, rowIndex + headerRowIndex);
        }
      }
      applyCellStyles(cell, col.isImage??false);
    });
    if (hasImage) {
      excelRow.height = rowHeight;
    }
  });
}
// Agrega una imagen centrada en la celda
function addCenteredImage(workbook: ExcelJS.Workbook,worksheet: ExcelJS.Worksheet,base64: string,colIndex: number,rowIndex: number): void {
  try {
    const imageId = workbook.addImage({base64,extension: 'png',});
    const cellWidth = worksheet.getColumn(colIndex + 1).width || 10;
    const cellWidthPx = cellWidth * 7;
    const cellHeightPx = CONFIG.IMAGE_HEIGHT * CONFIG.ROW_HEIGHT_MULTIPLIER;
    const offsetX = Math.max(0, (cellWidthPx - CONFIG.IMAGE_WIDTH) / 2);
    const offsetY = Math.max(0, (cellHeightPx - CONFIG.IMAGE_HEIGHT) / 2);
    worksheet.addImage(imageId, {
      tl: { 
        col: colIndex + (offsetX / cellWidthPx), 
        row: rowIndex + (offsetY / cellHeightPx)
      },
      ext: { 
        width: CONFIG.IMAGE_WIDTH, 
        height: CONFIG.IMAGE_HEIGHT 
      },
      editAs: 'oneCell',
    });
  } catch (error) {
  }
}
//Aplica estilos a una celda
function applyCellStyles(cell: ExcelJS.Cell, isImage: boolean): void {
  if (isImage) {
    cell.alignment = { 
      vertical: 'middle', 
      horizontal: 'center' 
    };
  } else {
    cell.alignment = { 
      vertical: 'top', 
      horizontal: 'left',
      wrapText: true 
    };
  }
}
// Aplica filtros automáticos y ajusta anchos de columna
function applyFiltersAndColumnWidths(worksheet: ExcelJS.Worksheet,columns: ColumnExcel[],headerRowIndex: number): void {
  worksheet.autoFilter = {
    from: { row: headerRowIndex, column: 1 },
    to: { row: headerRowIndex, column: columns.length },
  };
  // Ajustar ancho de columnas
  worksheet.columns.forEach((column:any, index:number) => {
    const col = columns[index];
    if (col.width) {
      column.width = col.width;
    } else if (col.isImage) {
      column.width = 10;
    } else {
      const headerText = col.header;
      const values = column.values || [];
      const maxLength = Math.max(
        headerText.length,
        ...values.slice(headerRowIndex).map((v:any) => v?.toString().length || 0)
      );
      column.width = Math.min(maxLength + CONFIG.COLUMN_PADDING, 50); // Máximo 50
    }
  });
}
// Descarga el archivo Excel
async function downloadWorkbook(workbook: ExcelJS.Workbook,titleDoc: string): Promise<void> {
  try {
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
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
// Sanitiza el nombre del archivo
function sanitizeFilename(name: string): string {
  return name.trim().replace(/[<>:"\/\\|?*\x00-\x1f]/g, '')|| 'reporte';
}