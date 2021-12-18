import Key from "./Components/Key";
import "./Styles/Styles.css";
import { useState, useEffect } from "react";
import ResetButton from "./Components/ResetButton";
import ScoreBoard from "./Components/ScoreBoard";
import GameBlockedContext from "./Contexts/GameBlockedContext";
import GameOver from "./Components/GameOver";
import { ScriptElementKind } from "typescript";

//DRUGI SKRIPTA
interface ScoreParams {
  TurnsLeft: number;
  TotalFound: number;
}

function App() {
  const [Score, SetScore] = useState<ScoreParams>({
    TurnsLeft: 16,
    TotalFound: 0,
  });
  const [Blocked, SetBlocked] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [PrevIndex, SetPrevIndex] = useState<number>(-1);
  const [ImageUrlPairs, setImagePairs] = useState([
    0, 3, 2, 1, 4, 5, 7, 6, 0, 3, 2, 1, 4, 5, 7, 6,
  ]);
  //neka je 0 hidden, 1 otvoreno ali temp, 2 ako si pogodia 2 ista
  const [KeyStates, SetKeyStates] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const ImageUrls = [1, 2, 3, 4, 5, 6, 7, 8];
  useEffect(() => {
    RestartGame();
  }, []);

  function RestartGame() {
    let temporary = [...ImageUrlPairs];
    temporary.sort(() => (Math.random() > 0.5 ? 1 : -1));
    let tempStates = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    SetKeyStates(tempStates);
    setImagePairs(temporary);
    let Temp = {
      TurnsLeft: 16,
      TotalFound: 0,
    };
    SetScore(Temp);
    SetBlocked(true);
    setTimeout(() => {
      SetBlocked(false);
    }, 500);
    let finished = false;
    setGameOver(finished);
    SetPrevIndex(-1);
  }

  function ButtonPress(index: number) {
    let tempStates = [...KeyStates];
    let Temp = {
      TurnsLeft: Score.TurnsLeft,
      TotalFound: Score.TotalFound,
    };

    if (PrevIndex == -1) {
      SetPrevIndex(index);
      tempStates[index] = 1;
    } else {
      Temp.TurnsLeft -= 1;
      if (ImageUrlPairs[index] == ImageUrlPairs[PrevIndex]) {
        tempStates[index] = 2;
        tempStates[PrevIndex] = 2;
        Temp.TotalFound += 1;
        SetPrevIndex(-1);
      } else {
        tempStates[index] = 1;
        tempStates[PrevIndex] = 1;
        SetBlocked(true);
        setTimeout(() => {
          MissDelay(index, PrevIndex);
        }, 1000);
      }
    }
    if (Temp.TotalFound > 7 || Temp.TurnsLeft < 1) {
      let finished = true;
      setGameOver(finished);
    }
    SetScore(Temp);
    SetKeyStates(tempStates);
  }

  async function MissDelay(index1: number, index2: number) {
    let tempStates = [...KeyStates];
    tempStates[index1] = 0;
    tempStates[index2] = 0;
    SetKeyStates(tempStates);
    setTimeout(() => {
      SetPrevIndex(-1);
      if (Score.TurnsLeft > 1 && Score.TotalFound < 8) SetBlocked(false);
      else {
        let finished = true;
        setGameOver(finished);
      }
    }, 250);
  }

  return (
    <div className="Background">
      <div className="Title"> Memory Game</div>
      <div className="UIWindow">
        <ResetButton callback={RestartGame} />
        <ScoreBoard TurnsLeft={Score.TurnsLeft} />
      </div>
      <GameBlockedContext.Provider value={Blocked}>
        {!gameOver ? (
          <div className="MainContainer">
            {ImageUrlPairs.map((pair, index) => (
              <Key
                key={index}
                index={index}
                ImageUrl={ImageUrls[pair].toString()}
                keyCallback={() => ButtonPress(index)}
                state={KeyStates[index]}
              />
            ))}
          </div>
        ) : (
          <GameOver score={Score.TotalFound} Victory={Score.TotalFound == 8} />
        )}
      </GameBlockedContext.Provider>
    </div>
  );
}

export default App;
