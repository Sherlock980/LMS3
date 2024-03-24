import React from 'react';
import DeleteButton from "./DeleteButton";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

function DataRow({ item, columns, onHandleDelete, viewModel }) {
  console.log("DataRow: Received Item", item);

  if (!item) {
    return null;
  }
  const editPath = `/edit-${viewModel.entitySingle}/${item.id}`;
  console.log('ViewModel in DataRow:', viewModel);
console.log('Popover content function:', viewModel.popoverContent);

// Assuming viewModel and item are correctly passed and defined

  const popoverContent = viewModel.popoverContent ? viewModel.popoverContent(item) : 'Default content';

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
        <Link to={editPath}>
          <Button className="m-2" variant="primary">
            <FaEdit />
          </Button>
        </Link>
      </td>
    </tr>
  );
}

export default DataRow;

