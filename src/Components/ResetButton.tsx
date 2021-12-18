import React from "react";

interface ResetProps {
  callback: () => any;
}

const ResetButton: React.FC<ResetProps> = ({ callback }) => {
  return (
    <button onClick={callback} className="ResetButton">
      Restart Game
    </button>
  );
};

export default ResetButton;
