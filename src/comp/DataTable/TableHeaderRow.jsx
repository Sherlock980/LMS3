import React from 'react';
import TableHeaderCol from './TableHeaderCol';

function TableHeaderRow({ columns, sortCol, sortDir, onHandleSort }) {
  return (
    <tr>
      {columns.map(column => (
        <TableHeaderCol
          key={column.name}
          label={column.label}
          colName={column.name}
          sortCol={sortCol}
          sortDir={sortDir}
          onHandleSort={onHandleSort}
        />
      ))}
      <th>Actions</th>
    </tr>
  );
}

export default TableHeaderRow;
