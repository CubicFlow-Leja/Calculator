import React from "react";

interface AlertMssg {
  ALERT: string;
}
const SessionMssg: React.FC<AlertMssg> = ({ ALERT }) => {
  return <div className="TextMain NoSelect AlertMssg  outline ">{ALERT}</div>;
};

export default SessionMssg;
