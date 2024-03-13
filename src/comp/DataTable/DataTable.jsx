import React from 'react';
import TableHeaderRow from './TableHeaderRow'; // Make sure this path is correct
import DataRow from './DataRow';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import SearchBar from '../SearchBar/SearchBar';

function DataTable({ data, onHandleDelete, sortCol, sortDir, onHandleSort, handleReset, columns, viewModel, filterText, onSearchHandler, setFilterText }) {
  return (
    <div className="data-table mb-4">
      <h1>{viewModel.list.listTitle}</h1> 
      <SearchBar filterText={filterText} onSearchHandler={onSearchHandler} setFilterText={setFilterText} />
      <table className={columns?.tableClasses || "table table-hover table-striped"}>
      <thead>
          <TableHeaderRow 
            columns={columns} 
            sortCol={sortCol} 
            sortDir={sortDir} 
            onHandleSort={onHandleSort} 
          />
        </thead>
        <tbody>
          {data.map((item, index) => (
            <DataRow
              key={item.id || `temp-key-${index}`}
              item={item}
              columns={columns}
              onHandleDelete={onHandleDelete}
              viewModel={viewModel}
            />
          ))}
        </tbody>
      </table>
      <div className='btn-cont'>
        <Button variant="primary" onClick={handleReset} className="btn">Clear</Button>
        <Link to={viewModel.addNewItemPath}>
          <Button className="btn m-2" variant="primary">New </Button>
        </Link>
      </div>
    </div>
  );
}

export default DataTable;
