import React from "react";

interface VictoryParams {
  score: number;
  Victory: boolean;
}
const GameOver: React.FC<VictoryParams> = ({ score, Victory }) => {
  return (
    <div className="TextMain GameOverScreen">
      Score : {score} <br></br>
      {Victory ? "Won" : "Lost"}
    </div>
  );
};

export default GameOver;
