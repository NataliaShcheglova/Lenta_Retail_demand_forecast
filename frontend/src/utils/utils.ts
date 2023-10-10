import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// export const exportToExcel = (tableData: any, columns: any, fileName: any) => {
//   const data = tableData.map((record: any) => columns.map((column: any) => record[column.dataIndex]));

//   const ws = XLSX.utils.aoa_to_sheet([columns.map((column: any) => column.title), ...data]);
//   const wb = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
//   const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
//   const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//   saveAs(blob, fileName);
// };

interface ForecastItem {
  store: string;
  sku: string;
  forecast_date: string;
  forecast: {
    [key: string]: number;
  };
}

export function exportToExcel(data: { data: ForecastItem[] }) {
  // Создаем новую книгу Excel
  const wb = XLSX.utils.book_new();

  // Преобразуем данные в формат для XLSX
  const wsData = data.data.map((item) => ({
    Store: item.store,
    SKU: item.sku,
    ForecastDate: item.forecast_date,
    ...item.forecast, // Добавляем прогнозы для каждой даты
  }));

  // Создаем лист книги
  const ws = XLSX.utils.json_to_sheet(wsData);

  // Добавляем лист книги
  XLSX.utils.book_append_sheet(wb, ws, 'ForecastData');

  // Сохраняем книгу в формате XLSX
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, 'forecast_data.xlsx');
}

export const formatDate = (inputDate: string) => {
  // Разделяем дату на год, месяц и день
  const parts = inputDate.split('-');

  if (parts.length !== 3) {
    return 'Неверный формат даты';
  }

  const year = parts[0];
  const month = parts[1];
  const day = parts[2];

  // Форматируем дату в нужный вид
  const formattedDate = `${day}.${month}.${year}`;

  return formattedDate;
};
