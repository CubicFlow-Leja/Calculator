import React, { ReactComponentElement } from "react";
import { useEffect, useState, useContext } from "react";
import GameBlockedContext from "../Contexts/GameBlockedContext";
interface KeyProps {
  keyCallback: (_index: number) => void;
  ImageUrl: string;
  state: number;
  index: number;
}

const Key: React.FC<KeyProps> = ({ state, index, ImageUrl, keyCallback }) => {
  const [btnclass, setbtnClass] = useState<string>("Btn2");
  const [State, setState] = useState<number>(0);
  const Blocked = useContext(GameBlockedContext);
  useEffect(() => {
    setState(state);
    setbtnClass(State === 0 ? "Btn2" : "Btn1");
  });

  const callback = () => {
    // console.log(Blocked);
    if (!Blocked) if (State == 0) keyCallback(index);
  };

  return (
    <button onClick={callback} className={btnclass}>
      {btnclass === "Btn1" && (
        <img src={`/Imgs/${ImageUrl}.png`} className="BtnImage" />
      )}
    </button>
  );
};
export default Key;
