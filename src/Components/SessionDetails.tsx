import React from "react";

interface SessionParams {
  STATUS: number;
  ID: number;
}
const SessionDetails: React.FC<SessionParams> = ({ STATUS, ID }) => {
  return (
    <div className="ServerClassContainer">
      <div
        className={`TextMain ServerClassItem ${
          STATUS >= 200 && STATUS < 300
            ? "ServerClassItemGood"
            : STATUS >= 300 && STATUS < 400
            ? "ServerClassItemCached"
            : STATUS >= 400 && STATUS < 500
            ? "ServerClassItemTimeout"
            : "ServerClassItemError"
        }`}
      >
        Server Status : {STATUS}{" "}
        {STATUS >= 200 && STATUS < 300
          ? "Good"
          : STATUS >= 300 && STATUS < 400
          ? "Cached Version Viable"
          : STATUS >= 400 && STATUS < 500
          ? "Session Timeout"
          : "Service Unavailable"}
      </div>
      <div className="TextMain ServerClassItem">Session id : {ID}</div>
    </div>
  );
};
//{(STATUS==201||STATUS==201)?"ServerClassItemGood":"ServerClassItemGood"}
export default SessionDetails;
