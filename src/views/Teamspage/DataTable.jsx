import React from 'react';
import TableHeaderRow from './TableHeaderRow';
import DataRow from './DataRow';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

function DataTable({ teams, onHandleDelete, sortCol, sortDir, onHandleSort, handleReset, columns }) {
  return (
    <div className="team-cell-table mb-4">
      <h1>BSL Teams</h1>
      <table className={columns.tableClasses || "table table-hover table-striped"}>
        <thead>
          <TableHeaderRow 
            columns={columns} 
            sortCol={sortCol} 
            sortDir={sortDir} 
            onHandleSort={onHandleSort} 
          />
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <DataRow
              key={team.id || `temp-key-${index}`}
              team={team}
              columns={columns}
              onHandleDelete={onHandleDelete}
            />
          ))}
        </tbody>

      </table>

      <Button
        variant="primary"
        onClick={handleReset}
        className="clear-btn"
      >
        Clear
      </Button>

      <Link to="/add-team">
        <Button className="m-2" variant="primary">New</Button>
      </Link>


    </div>
  );
}

export default DataTable;
