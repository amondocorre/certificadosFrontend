import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { getBase64List} from '../fileUtils';
interface ColumnPdf {
  accessorKey: string;
  header: string;
  isImage?: boolean;
}
interface PdfProps {
  data: Record<string, any>[];
  columns: ColumnPdf[];
  titlePdf?: string;
  titleDoc: string;
}
function calcularFontSize(numColumnas: number): number {
  const maxFontSize = 10;
  const minFontSize = 4;
  const baseColumnas = 6;

  const size = maxFontSize - (numColumnas - baseColumnas) * 0.9;
  return Math.max(minFontSize, Math.min(maxFontSize, size));
}
export const exportToPDF = async({ data, columns, titleDoc, titlePdf }: PdfProps): Promise<void> => { 
  if (!data || data.length === 0 || columns.length === 0) return;
  titleDoc=titleDoc?titleDoc:'pdf';
  const fontSize = calcularFontSize(columns.length);
  const doc = new jsPDF();
  if (titlePdf) {
    doc.setFontSize(16);
    doc.text(titlePdf, 14, 20);
  }
  const headers = columns.map(col => col.header);
  const imageUrls: string[] = [];
  for (const row of data) {
    for (const col of columns) {
      if (col.isImage && row[col.accessorKey]) {
        imageUrls.push(row[col.accessorKey]);
      }
    }
  }
  const imageCache: Record<string, string> =await getBase64List(imageUrls)
  const rows = data.map(row =>
    columns.map(col => row[col.accessorKey] ?? '')
  );
  autoTable(doc, {
    startY: titlePdf ? 25 : 10,
    head: [headers],
    body: rows,
    styles: {
      fontSize: fontSize,
      lineColor: [100, 100, 100],
      lineWidth: 0.3,
    },
    headStyles: {
      fillColor: [31, 108, 250],
      textColor: 255,
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    columnStyles: columns.reduce((acc, col, i) => {
    if (col.isImage) {
      acc[i] = { textColor: [255, 255, 255] ,cellWidth: 15 };
    }
    return acc;
  }, {} as Record<number, any>),
    didDrawCell: (data) => {
      const index = data.column.index;
      const col = columns[index];
      if (col.isImage) {
        const url = (data.row.raw as string[])[index];
        const base64 = imageCache[url];
        if (url && base64) {
          const cell = data.cell;
          const imgSize = 10;
          const x = cell.x + (cell.width-imgSize)/2;
          const y = cell.y + ((cell.height-imgSize)/2);
          doc.addImage(base64, 'PNG', x, y, imgSize, imgSize);
        }
      }
    }
  });
  doc.save(`${titleDoc}.pdf`);
};



