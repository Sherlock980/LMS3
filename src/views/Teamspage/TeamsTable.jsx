import React from 'react';
import TeamHeaderRow from './TeamHeaderRow';
import TeamRow from './TeamRow';
import Button from 'react-bootstrap/Button';

function TeamsTable({ teams, onHandleDelete, sortCol, sortDir, onHandleSort, handleReset }) {
  return (
    <div className="team-cell-table mb-4">
      <h1>BSL Teams</h1>
      <table className="table table-hover table-striped">
        <thead>
          <TeamHeaderRow
            onHandleSort={onHandleSort}
            sortCol={sortCol}
            sortDir={sortDir}
          />
        </thead>
        <tbody>
          {teams.map(team => (
            <TeamRow key={team.id} team={team} onHandleDelete={() => onHandleDelete(team.id)} />
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
    </div>
  );
}

export default TeamsTable;
