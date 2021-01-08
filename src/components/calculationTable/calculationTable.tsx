import React from 'react';
import { Point } from '~/components/linearChart';
import { DataGrid, ColDef } from '@material-ui/data-grid';

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

const CalculationTable: React.FC<Props> = ({ data }) => {
  return <DataGrid rows={data} columns={columns} pageSize={100} />;
};

export default CalculationTable;
