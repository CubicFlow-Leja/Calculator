import React, { ReactComponentElement } from "react";
import { useEffect, useState } from "react";
interface KeyProps {
  keyCallback: (index: any) => any;
  ImageUrl: string;
  state: number;
  index: number;
}

const Key: React.FC<KeyProps> = ({ state, index, ImageUrl, keyCallback }) => {
  const [btnclass, setbtnClass] = useState<string>("Btn2");
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (count === 0) return;
    if (btnclass === "Btn2") setbtnClass("Btn1");
    else setbtnClass("Btn2");
  }, [count]);

  const callback = (index: any) => {
    setCount(count + 1);
    keyCallback(index);
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
