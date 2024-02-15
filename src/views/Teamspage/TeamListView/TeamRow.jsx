import React from 'react';
import DeleteButton from "../DeleteButton";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

function TeamRow({ team, onHandleDelete }) {
  const popover = (
    <Popover id={`popover-${team.id}`}>
      <Popover.Header as="h4">{team.name}</Popover.Header>
      <Popover.Body>
        <div>
          {team.logo_path && <img src={team.logo_path} alt={team.name} style={{ width: '100px', height: '100px' }} />}
          <p>OFFICIAL MEMBER</p>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger trigger={['hover', 'focus']} placement='bottom' overlay={popover}>
      <tr>
        <td>{team.name}</td>
        <td>{team.coachName}</td>
        <td>{team.coachPhone}</td>
        <td>{team.numberOfPlayers}</td>
        <td>
          <Link to={`/edit-team/${team.id}`}><FaEdit /></Link>
          <DeleteButton teamId={team.id} teamName={team.name} onDelete={() => onHandleDelete(team.id)} />
        </td>
      </tr>
    </OverlayTrigger>
  );
}

export default TeamRow;
