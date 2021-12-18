import Key from "./Components/Key";
import "./Styles/Styles.css";
import { useState, useEffect } from "react";
import ResetButton from "./Components/ResetButton";
import ScoreBoard from "./Components/ScoreBoard";

const NumberOfButtons = 64;
function App() {
  useEffect(() => {
    //
  });

  const ImageUrls = [1, 2, 3, 4, 5, 6, 7, 8];
  const ImageUrlPairs = [0, 3, 2, 1, 4, 5, 7, 6, 0, 3, 2, 1, 4, 5, 7, 6];

  function RandomizeImages() {
    ImageUrlPairs.sort(() => (Math.random() > 0.5 ? 1 : -1));
  }
  function ButtonPress(e: any) {
    console.log(e);
  }

  return (
    <div className="Background">
      <div className="Title"> Memory Game</div>
      <div className="UIWindow">
        <ResetButton />
        <ScoreBoard />
      </div>
      <div className="MainContainer">
        <Key
          ImageUrl={ImageUrls[ImageUrlPairs[0]].toString()}
          keyCallback={ButtonPress}
        />
        <Key
          ImageUrl={ImageUrls[ImageUrlPairs[1]].toString()}
          keyCallback={ButtonPress}
        />
        <Key
          ImageUrl={ImageUrls[ImageUrlPairs[2]].toString()}
          keyCallback={ButtonPress}
        />
        <Key
          ImageUrl={ImageUrls[ImageUrlPairs[3]].toString()}
          keyCallback={ButtonPress}
        />
        <Key
          ImageUrl={ImageUrls[ImageUrlPairs[4]].toString()}
          keyCallback={ButtonPress}
        />
        <Key
          ImageUrl={ImageUrls[ImageUrlPairs[5]].toString()}
          keyCallback={ButtonPress}
        />
        <Key
          ImageUrl={ImageUrls[ImageUrlPairs[6]].toString()}
          keyCallback={ButtonPress}
        />
        <Key
          ImageUrl={ImageUrls[ImageUrlPairs[7]].toString()}
          keyCallback={ButtonPress}
        />
        <Key
          ImageUrl={ImageUrls[ImageUrlPairs[8]].toString()}
          keyCallback={ButtonPress}
        />
        <Key
          ImageUrl={ImageUrls[ImageUrlPairs[9]].toString()}
          keyCallback={ButtonPress}
        />
        <Key
          ImageUrl={ImageUrls[ImageUrlPairs[10]].toString()}
          keyCallback={ButtonPress}
        />
        <Key
          ImageUrl={ImageUrls[ImageUrlPairs[11]].toString()}
          keyCallback={ButtonPress}
        />
        <Key
          ImageUrl={ImageUrls[ImageUrlPairs[12]].toString()}
          keyCallback={ButtonPress}
        />
        <Key
          ImageUrl={ImageUrls[ImageUrlPairs[13]].toString()}
          keyCallback={ButtonPress}
        />
        <Key
          ImageUrl={ImageUrls[ImageUrlPairs[14]].toString()}
          keyCallback={ButtonPress}
        />
        <Key
          ImageUrl={ImageUrls[ImageUrlPairs[15]].toString()}
          keyCallback={ButtonPress}
        />
      </div>
    </div>
  );
}

export default App;
