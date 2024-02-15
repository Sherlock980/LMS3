import React from 'react';
import TeamHeaderCol from './TeamHeaderCol';

function TeamHeaderRow({ sortCol, sortDir, onHandleSort }) {
  return (
    <tr>
      <TeamHeaderCol
        label="Team Name"
        colName="name"
        sortCol={sortCol}
        sortDir={sortDir}
        onHandleSort={onHandleSort}
      />
      <TeamHeaderCol
        label="Coach Name"
        colName="coachName"
        sortCol={sortCol}
        sortDir={sortDir}
        onHandleSort={onHandleSort}
      />
      <TeamHeaderCol
        label="Coach Phone"
        colName="coachPhone"
        sortCol={sortCol}
        sortDir={sortDir}
        onHandleSort={onHandleSort}
      />
      <TeamHeaderCol
        label="# of Players"
        colName="numberOfPlayers"
        sortCol={sortCol}
        sortDir={sortDir}
        onHandleSort={onHandleSort}
      />
      <th>Actions</th>
    </tr>
  );
}

export default TeamHeaderRow;


