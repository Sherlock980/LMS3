import React from 'react';
import TeamHeaderCol from './TeamHeaderCol';

function TeamHeaderRow({ columns, sortCol, sortDir, onHandleSort }) {
  return (
    <tr>
      {columns.map(column => (
        <TeamHeaderCol
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

export default TeamHeaderRow;
