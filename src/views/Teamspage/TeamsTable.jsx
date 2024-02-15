import React from 'react';
import TeamHeaderRow from './TeamHeaderRow';
import TeamRow from './TeamRow';

function TeamsTable({ teams, onHandleDelete, sortCol, sortDir, onHandleSort }) {
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
    </div>
  );
}


export default TeamsTable;

