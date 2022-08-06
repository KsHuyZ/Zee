import { usePubSub } from "@videosdk.live/react-sdk";
import React, { useState } from "react";
import { MessageList } from "./MessageList";
import "../style/index.css";

const borderRadius = 8;
const primary = "#202329";
const Title = ({ title, dark }) => {
  return <h2 style={{ color: dark ? primary : "#fff" }}>{title}</h2>;
};

function MeetingChat({ tollbarHeight }) {
  const { publish, messages } = usePubSub("CHAT", {});
  const [message, setMessage] = useState("");
  return (
    <div
      style={{
        marginLeft: borderRadius,
        width: 400,
        backgroundColor: primary,
        overflowY: "scroll",
        height: "100%",
      }}
    >
      <div style={{ height: "90%" }} className="mess-list">
        <MessageList messages={messages} />
      </div>

      <div style={{ display: "flex" }} className="mess-type">
        <input
          className="message-input"
          value={message}
          placeholder="Type a message..."
          onChange={(e) => {
            const v = e.target.value;
            setMessage(v);
          }}
        />
        <button
        
          className={"button default send-button"}
          onClick={() => {
            const m = message;
            if (m.length) {
              publish(m, { persist: true });
              setMessage("");
            }
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default MeetingChat;
