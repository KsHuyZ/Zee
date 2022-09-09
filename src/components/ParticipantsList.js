import { useMeeting } from "@videosdk.live/react-sdk";
import React from "react";

const chunk = (arr) => {
  const newArr = [];
  while (arr.length) newArr.push(arr.splice(0, 3));
  return newArr;
};

function ParticipantsList() {
  const { participants } = useMeeting();
  console.log('particpant', participants);
  return (
    <div
      style={{
        marginLeft: 8,
        width: 400,
        backgroundColor: "#202329",
        height: "100%",
        position: "relative",
      }}
    >
      <div style={{ height: "84vh" }} className="message-list">
        <div className="participants">
          {chunk([...participants.values()]).map((k, index) => (
            <div style={{ display: "flex" }}>{k.map((l) => l.displayName)}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ParticipantsList;
