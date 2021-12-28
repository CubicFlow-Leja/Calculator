import React from "react";

interface ScoreParams {
  TurnsLeft: number;
}
const ScoreBoard: React.FC<ScoreParams> = ({ TurnsLeft }) => {
  return (
    <div className="TextMain Clicks  NoSelect">Turns left: {TurnsLeft}</div>
  );
};

export default ScoreBoard;
