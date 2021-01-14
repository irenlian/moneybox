import React, { useMemo } from 'react';
import { DataGrid, ColDef } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next';
import { Point } from '~/components/linearChart';
import { getAge, getAmount, getYear } from '~/components/linearChart/chartUtils';
import { StyledButton } from './calculationTable.styled';
import { table } from '~/locales/localeKeys';

type Props = {
  data: Point[];
};

const getColumns = (t: any): ColDef[] => [
  {
    field: 'date',
    headerName: t(table.year),
    type: 'date',
    flex: 1,
  },
  {
    field: 'age',
    headerName: t(table.age),
    type: 'number',
    flex: 1,
  },
  {
    field: 'amount',
    headerName: t(table.deposit),
    type: 'number',
    flex: 1,
  },
];

const createTable = (data: Point[], t: any) => {
  let tableHTML = '<tbody>';
  tableHTML += `<tr><td>${t(table.year)}</td><td>${t(table.age)}</td><td>${t(table.deposit)}</td></tr>`;
  data.forEach(p => {
    tableHTML += `<tr><td>${getYear(p)}</td><td>${getAge(p)}</td><td>${getAmount(p)}</td></tr>`;
  });
  tableHTML += '</tbody>';
  return tableHTML;
};

const parseToXLS = (tableHTML: string, sheetName = 'Sheet') => {
  let dataXls =
    "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40' lang='en'><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>";
  dataXls += `${sheetName}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>`;
  dataXls += `${tableHTML}</table></body></html>`;
  return dataXls;
};

function exportTableToExcel(tableHTML: string, file = '') {
  const dataType = 'application/vnd.ms-excel';

  if (!tableHTML) return;

  // Specify file name
  const filename = file ? `${file}.xls` : 'excel_data.xls';

  // Create download link element
  const downloadLink = document.createElement('a');

  document.body.appendChild(downloadLink);

  if (navigator.msSaveOrOpenBlob) {
    const blob = new Blob(['\ufeff', tableHTML], {
      type: dataType,
    });
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    // Create a link to the file
    downloadLink.href = `data:${dataType}, ${tableHTML}`;

    // Setting the file name
    downloadLink.download = filename;

    // triggering the function
    downloadLink.click();
  }
}

const CalculationTable: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();

  const columns: ColDef[] = useMemo(() => getColumns(t), [t]);

  return (
    <>
      <StyledButton
        variant="contained"
        onClick={() => exportTableToExcel(parseToXLS(createTable(data, t)), 'investing')}>
        {t(table.export)}
      </StyledButton>
      <DataGrid rows={data} columns={columns} pageSize={100} />
    </>
  );
};

export default CalculationTable;
