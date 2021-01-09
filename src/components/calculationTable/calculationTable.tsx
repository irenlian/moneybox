import React from 'react';
import { DataGrid, ColDef } from '@material-ui/data-grid';
import { Point } from '~/components/linearChart';
import { getAge, getAmount, getYear } from '~/components/linearChart/chartUtils';
import { StyledButton } from './calculationTable.styled';

type Props = {
  data: Point[];
};

const columns: ColDef[] = [
  {
    field: 'date',
    headerName: 'Year',
    type: 'date',
    flex: 1,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    flex: 1,
  },
  {
    field: 'amount',
    headerName: 'Deposit',
    type: 'number',
    flex: 1,
  },
];

const createTable = (data: Point[]) => {
  let tableHTML = '<tbody>';
  tableHTML += '<tr><td>Year</td><td>Age</td><td>Amount</td></tr>';
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
  return (
    <>
      <StyledButton variant="contained" onClick={() => exportTableToExcel(parseToXLS(createTable(data)), 'investing')}>
        Export to Excel
      </StyledButton>
      <DataGrid rows={data} columns={columns} pageSize={100} />
    </>
  );
};

export default CalculationTable;
