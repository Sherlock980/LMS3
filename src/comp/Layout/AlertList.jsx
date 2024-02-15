import React from 'react';
import Alert from 'react-bootstrap/Alert';

const AlertList = ({ alerts, onDismiss }) => {
  return (
    <div>
      {alerts.map((alert) => (
        <Alert key={alert.id} variant={alert.type} onClose={() => onDismiss(alert.id)} dismissible>
          {alert.title}
        </Alert>
      ))}
    </div>
  );
};

export default AlertList;
