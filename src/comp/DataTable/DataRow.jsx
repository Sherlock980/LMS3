import React from 'react';
import DeleteButton from "./DeleteButton";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

function DataRow({ item, columns, onHandleDelete, viewModel }) {
  if (!item) {
    return null;
  }

  const popoverContent = viewModel.popoverContent(item);

  const popover = (
    <Popover id={`popover-${item.id}`}>
      <Popover.Header as="h4">{item.name}</Popover.Header>
      <Popover.Body>
        <div>{popoverContent}</div>
      </Popover.Body>
    </Popover>
  );

  return (
    <tr>
      {columns.map(column => {
        if (column.name === viewModel.nameCol) {
          return (
            <OverlayTrigger 
              key={column.name} 
              trigger={['hover', 'focus']} 
              placement='bottom' 
              overlay={popover}
            >
              <td>{item[column.name]}</td>
            </OverlayTrigger>
          );
        } else {
          return <td key={column.name}>{item[column.name]}</td>;
        }
      })}
      <td>
        <DeleteButton itemId={item.id} itemName={item[viewModel.nameCol]} onDelete={() => onHandleDelete(item.id)} />
        <Link to={viewModel.editItemPath(item.id)}>
          <Button className="m-2" variant="primary"><FaEdit /></Button>
        </Link>
      </td>
    </tr>
  );
}

export default DataRow;

