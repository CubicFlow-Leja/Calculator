import React from "react";

interface ResetProps {
  callback: () => any;
  Text: string;
}

const ResetButton: React.FC<ResetProps> = ({ callback, Text }) => {
  return (
    <button onClick={callback} className="ResetButton TextMain NoSelect">
      {Text}
    </button>
  );
};

export default ResetButton;
