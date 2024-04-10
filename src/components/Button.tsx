import React from 'react';
import { Button } from 'react-bootstrap';

const StopWatchButton = ({
  label,
  onClickHandler,
  buttonClass
}: {
  onClickHandler: () => void;
  label: string;
  buttonClass: string;
}) => {
  return (
    <Button
      className={`btn ${buttonClass}`}
      style={{ padding: 10, borderRadius: 50, fontSize: 22, width: 100 }}
      onClick={onClickHandler}>
      {label}
    </Button>
  );
};

export default React.memo(StopWatchButton);
