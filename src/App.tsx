import Key from "./Components/Key";
import "./Styles/Styles.css";
import { useState, useEffect } from "react";
import ResetButton from "./Components/ResetButton";
import ScoreBoard from "./Components/ScoreBoard";
import GameBlockedContext from "./Contexts/GameBlockedContext";
import GameOver from "./Components/GameOver";
import { ScriptElementKind } from "typescript";
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
            <Key
              ImageUrl={ImageUrls[ImageUrlPairs[0]].toString()}
              keyCallback={ButtonPress}
              index={0}
              state={KeyStates[0]}
            />
            <Key
              ImageUrl={ImageUrls[ImageUrlPairs[1]].toString()}
              keyCallback={ButtonPress}
              index={1}
              state={KeyStates[1]}
            />
            <Key
              ImageUrl={ImageUrls[ImageUrlPairs[2]].toString()}
              keyCallback={ButtonPress}
              index={2}
              state={KeyStates[2]}
            />
            <Key
              ImageUrl={ImageUrls[ImageUrlPairs[3]].toString()}
              keyCallback={ButtonPress}
              index={3}
              state={KeyStates[3]}
            />
            <Key
              ImageUrl={ImageUrls[ImageUrlPairs[4]].toString()}
              keyCallback={ButtonPress}
              index={4}
              state={KeyStates[4]}
            />
            <Key
              ImageUrl={ImageUrls[ImageUrlPairs[5]].toString()}
              keyCallback={ButtonPress}
              index={5}
              state={KeyStates[5]}
            />
            <Key
              ImageUrl={ImageUrls[ImageUrlPairs[6]].toString()}
              keyCallback={ButtonPress}
              index={6}
              state={KeyStates[6]}
            />
            <Key
              ImageUrl={ImageUrls[ImageUrlPairs[7]].toString()}
              keyCallback={ButtonPress}
              index={7}
              state={KeyStates[7]}
            />
            <Key
              ImageUrl={ImageUrls[ImageUrlPairs[8]].toString()}
              keyCallback={ButtonPress}
              index={8}
              state={KeyStates[8]}
            />
            <Key
              ImageUrl={ImageUrls[ImageUrlPairs[9]].toString()}
              keyCallback={ButtonPress}
              index={9}
              state={KeyStates[9]}
            />
            <Key
              ImageUrl={ImageUrls[ImageUrlPairs[10]].toString()}
              keyCallback={ButtonPress}
              index={10}
              state={KeyStates[10]}
            />
            <Key
              ImageUrl={ImageUrls[ImageUrlPairs[11]].toString()}
              keyCallback={ButtonPress}
              index={11}
              state={KeyStates[11]}
            />
            <Key
              ImageUrl={ImageUrls[ImageUrlPairs[12]].toString()}
              keyCallback={ButtonPress}
              index={12}
              state={KeyStates[12]}
            />
            <Key
              ImageUrl={ImageUrls[ImageUrlPairs[13]].toString()}
              keyCallback={ButtonPress}
              index={13}
              state={KeyStates[13]}
            />
            <Key
              ImageUrl={ImageUrls[ImageUrlPairs[14]].toString()}
              keyCallback={ButtonPress}
              index={14}
              state={KeyStates[14]}
            />
            <Key
              ImageUrl={ImageUrls[ImageUrlPairs[15]].toString()}
              keyCallback={ButtonPress}
              index={15}
              state={KeyStates[15]}
            />
          </div>
        ) : (
          <GameOver score={Score.TotalFound} Victory={Score.TotalFound == 8} />
        )}
      </GameBlockedContext.Provider>
    </div>
  );
}

export default App;
