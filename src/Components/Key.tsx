import React, { ReactComponentElement } from "react";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
interface KeyProps {
  keyCallback: (e: any) => any;
  ImageUrl: string;
}

const Key: React.FC<KeyProps> = ({ ImageUrl, keyCallback }) => {
  const [btnclass, setbtnClass] = useState<string>("Btn2");
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (count === 0) return;
    if (btnclass === "Btn2") setbtnClass("Btn1");
    else setbtnClass("Btn2");
  }, [count]);

  const callback = (e: any) => {
    setCount(count + 1);
    keyCallback(e);
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
