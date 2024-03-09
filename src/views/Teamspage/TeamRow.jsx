import React from 'react';
import DeleteButton from "./DeleteButton";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

function TeamRow({ team, columns, onHandleDelete }) {
  const logoSrc = team.logo_path || team.logo_url;

  const popover = (
    <Popover id={`popover-${team.id}`}>
      <Popover.Header as="h4">{team.name}</Popover.Header>
      <Popover.Body>
        <div>
          {logoSrc && (
            <img src={logoSrc} alt={`${team.name} logo`} style={{ width: '100px', height: '100px' }} />
          )}
          <p>OFFICIAL MEMBER</p>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <tr>
      {columns.map(column => {
        if (column.name === "name") {
          return (
            <OverlayTrigger key={column.name} trigger={['hover', 'focus']} placement='bottom' overlay={popover}>
              <td>{team[column.name]}</td>
            </OverlayTrigger>
          );
        } else {
          return (
            <td key={column.name}>{team[column.name]}</td>
          );
        }
      })}
      <td>
        <Link to={`/edit-team/${team.id}`}>
            <Button className="m-2" variant="primary">
                <FaEdit />
            </Button>
        </Link>
        <DeleteButton teamId={team.id} teamName={team.name} onDelete={() => onHandleDelete(team.id)} />
      </td>
    </tr>
  );
}

export default TeamRow;
