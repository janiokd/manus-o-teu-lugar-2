import Spreadsheet, { CellBase, Matrix } from 'react-spreadsheet';
// @mui

// ----------------------------------------------------------------------

type SpreadsheetProps = {
  data: Matrix<CellBase>;
  rowLabels?: string[];
  columnLabels?: string[];
};

export default function Excelsheet({
  data = [],
  rowLabels = [],
  columnLabels = [],
  ...other
}: SpreadsheetProps) {
  const rows = [...Array(data.length).map((item, _) => (item + 1).toString())];
  const cols = ['1', '2', '3', '4'];

  return <Spreadsheet data={data} columnLabels={cols} rowLabels={rows} />;
}
