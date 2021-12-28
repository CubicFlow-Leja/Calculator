import Key from "./Components/Key";
import "./Styles/Styles.css";
import { useState, useEffect } from "react";
import ResetButton from "./Components/ResetButton";
import ScoreBoard from "./Components/ScoreBoard";
import GameBlockedContext from "./Contexts/GameBlockedContext";
import GameOver from "./Components/GameOver";
import SessionDetails from "./Components/SessionDetails";
import SessionMssg from "./Components/SessionMssg";

const url = "http://localhost:3001";
//const url = "https://memorygamebackend.herokuapp.com/";

interface ButtonClickInterface {
  click1: number;
  click2: number;
}

interface GameSession {
  id: number;
  turns: number;
  TotalFound: number;
  gameOver: boolean;
  ImagePairs: number[];
  KeyStates: number[];
  Win: boolean;
  lastInputtime: number;
}
const DefaultSession: GameSession = {
  id: -1,
  turns: 16,
  TotalFound: 0,
  gameOver: false,
  ImagePairs: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7],
  KeyStates: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  Win: false,
  lastInputtime: 0,
};

function App() {
  const [GameStatus, SetGameStatus] = useState<number>(0);
  const [CurrentGamesession, SetGameSession] =
    useState<GameSession>(DefaultSession);

  const [Blocked, SetBlocked] = useState<boolean>(false);
  const ImageUrls = [1, 2, 3, 4, 5, 6, 7, 8];
  useEffect(() => {
    CheckServer();
  }, []);

  const [ButtonsClicked, SetClickedIndex] = useState<ButtonClickInterface>({
    click1: -1,
    click2: -1,
  });

  async function CheckServer() {
    const CheckServer = async () => {
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
      });
      try {
        const data = await response.json();
        return { DATA: data, STATUS: response.status };
      } catch (ERR) {
        console.error(ERR);
      }
    };

    let RESPONSEDATA = await CheckServer();
    if (RESPONSEDATA != null) {
      SetGameStatus(RESPONSEDATA.STATUS);
    } else SetGameStatus(500); //SERVER ERROR
  }

  async function NewGame() {
    const StartNewGame = async () => {
      const response = await fetch(url + "/MemoryGameInit", {
        method: "PATCH",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: CurrentGamesession.id,
        }),
      });
      try {
        const data = await response.json();
        return { DATA: data, STATUS: response.status };
      } catch (ERR) {
        console.error(ERR);
      }
    };

    let RESPONSEDATA = await StartNewGame();
    //console.log(SessionData);
    if (RESPONSEDATA != null) {
      if (RESPONSEDATA.STATUS == 201) {
        SetGameSession(RESPONSEDATA.DATA);
        SetClickedIndex({ click1: -1, click2: -1 });
        SetGameStatus(RESPONSEDATA.STATUS); //RADI
      } else if (RESPONSEDATA.STATUS == 503) {
        //console.log(RESPONSEDATA.DATA);
        SetGameStatus(RESPONSEDATA.STATUS); //SESSION LIMIT
      }
    } else SetGameStatus(500); //SERVER ERROR
  }

  function ButtonClick(ButtonIndex: number) {
    let TempButtons: ButtonClickInterface = {
      click1: ButtonsClicked.click1,
      click2: ButtonsClicked.click2,
    };

    if (ButtonsClicked.click1 == -1) {
      TempButtons.click1 = ButtonIndex;
      SetClickedIndex(TempButtons);
    } else {
      TempButtons.click2 = ButtonIndex;
      SetClickedIndex(TempButtons);
      SetBlocked(true); //lock
      SendButtonDataToServer(TempButtons); //runna async send
    }
  }

  async function SendButtonDataToServer(ButtonsData: ButtonClickInterface) {
    const TryPair = async () => {
      const response = await fetch(url + "/GameTick", {
        method: "PATCH",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: CurrentGamesession.id,
          ClickedIndex1: ButtonsData.click1,
          ClickedIndex2: ButtonsData.click2,
        }),
      });
      try {
        const data = await response.json();
        return { DATA: data, STATUS: response.status };
      } catch (ERR) {
        console.error(ERR);
      }
    };

    let RESPONSEDATA = await TryPair();

    //console.log(SessionData);
    if (RESPONSEDATA != null) {
      switch (RESPONSEDATA.STATUS) {
        case 201: //gg kreirano
          SetGameSession(RESPONSEDATA.DATA);
          MissDelay();
          SetGameStatus(RESPONSEDATA.STATUS); //RADI
          break;
        case 304: //cachirani session valja
          // console.log(RESPONSEDATA.DATA);
          MissDelay();
          SetGameStatus(RESPONSEDATA.STATUS); //RADI
          break;
        case 410: //session timeout
          //console.log(RESPONSEDATA.DATA);
          SetGameStatus(RESPONSEDATA.STATUS); //TIMEOUT
          SetGameSession(DefaultSession);
          MissDelay();
          break;
      }
    } else SetGameStatus(500); //SERVER ERROR
  }

  function ButtonPress(index: number) {
    ButtonClick(index);
  }

  async function MissDelay() {
    setTimeout(() => {
      SetClickedIndex({ click1: -1, click2: -1 });
      SetBlocked(false);
    }, 500);
  }

  return (
    <div className="flexMain Background">
      <div className="flexMain Container Container1 outline">
        <div className="flexRow  NoSelect">
          <div className="Title">Memory Game</div>
        </div>
        <div className="flexRow UIWindow NoSelect">
          <SessionDetails ID={CurrentGamesession.id} STATUS={GameStatus} />
          <ResetButton
            callback={NewGame}
            Text={CurrentGamesession.id == -1 ? "New Game" : "Restart Game"}
          />
          <ScoreBoard
            TurnsLeft={
              CurrentGamesession.id != -1 ? CurrentGamesession.turns : 0
            }
          />
        </div>
      </div>
      <div className="flexMain Container Container2">
        <GameBlockedContext.Provider value={Blocked}>
          {!CurrentGamesession.gameOver && CurrentGamesession.id != -1 ? (
            <div className="outline MainContainer NoSelect">
              {CurrentGamesession.ImagePairs.map((pair, index) => (
                <Key
                  key={index}
                  index={index}
                  ImageUrl={ImageUrls[pair].toString()}
                  keyCallback={() => ButtonPress(index)}
                  state={
                    ButtonsClicked.click1 == index ||
                    ButtonsClicked.click2 == index
                      ? 1
                      : CurrentGamesession.KeyStates[index]
                  }
                />
              ))}
            </div>
          ) : CurrentGamesession.id == -1 ? (
            <SessionMssg
              ALERT={GameStatus > 400 ? "Session Timeout" : "Start new Game"}
            />
          ) : (
            <GameOver
              score={CurrentGamesession.TotalFound}
              Victory={CurrentGamesession.Win}
            />
          )}
        </GameBlockedContext.Provider>
      </div>
    </div>
  );
}

export default App;
