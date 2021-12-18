import Key from "./Components/Key";
import "./Styles/Styles.css";
import { useState, useEffect } from "react";
import ResetButton from "./Components/ResetButton";
import ScoreBoard from "./Components/ScoreBoard";

const NumberOfButtons = 64;
function App() {
  const [ImageUrlPairs, setImagePairs] = useState([
    0, 3, 2, 1, 4, 5, 7, 6, 0, 3, 2, 1, 4, 5, 7, 6,
  ]);
  //neka je 0 hidden, 1 otvoreno ali temp, 2 ako si pogodia 2 ista
  const [KeyStates, SetKeyStats] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const ImageUrls = [1, 2, 3, 4, 5, 6, 7, 8];
  useEffect(() => {
    RandomizeImages();
  }, []);

  function RandomizeImages() {
    let temporary = [...ImageUrlPairs];
    temporary.sort(() => (Math.random() > 0.5 ? 1 : -1));
    setImagePairs(temporary);
  }
  function ButtonPress(e: any) {
    //console.log(e);
    //spremi index onog kojeg si kliknia i stavi state na 1
    //ako postoji vec neki s state 1 vidi jel ista slika
    //ako je ista stavi in state na 2 i inkrementira score
    //ako nije ista stavi ih oboje na 0
  }

  return (
    <div className="Background">
      <div className="Title"> Memory Game</div>
      <div className="UIWindow">
        <ResetButton callback={RandomizeImages} />
        <ScoreBoard />
      </div>
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
    </div>
  );
}

export default App;
