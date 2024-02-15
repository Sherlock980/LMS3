import React from 'react';
import { FaSortUp, FaSortDown, FaSort } from 'react-icons/fa';

function TeamHeaderCol({ label, thClasses = "", colName, sortCol, sortDir, onHandleSort }) {
  let SortIcon = FaSort;
  if (colName === sortCol) {
    SortIcon = sortDir === 'asc' ? FaSortUp : FaSortDown;
  }

  const handleSortClick = () => {
    const nextSortDir = sortCol === colName && sortDir === 'asc' ? 'desc' : 'asc';
    onHandleSort(colName, nextSortDir);
  };

  return (
    <th className={thClasses} onClick={handleSortClick}>
      {label} <SortIcon />
    </th>
  );
}

export default TeamHeaderCol;

