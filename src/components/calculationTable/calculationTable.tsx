import React from 'react';
import { Point } from '~/components/linearChart';
import { DataGrid, ColDef } from '@material-ui/data-grid';

type Props = {
  data: Point[];
};

const CalculationTable: React.FC<Props> = ({ data }) => {
  const columns: ColDef[] = [
    {
      field: 'date',
      headerName: 'Year',
      type: 'date',
      flex: 1,
      width: 300,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      flex: 1,
      width: 300,
    },
    {
      field: 'amount',
      headerName: 'Deposit',
      type: 'number',
      flex: 1,
      width: 400,
    },
  ];
  return <DataGrid rows={data} columns={columns} pageSize={100} />;
};

export default CalculationTable;
