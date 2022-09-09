import { usePubSub } from "@videosdk.live/react-sdk";
import React, { useState } from "react";
import { MessageList } from "./MessageList";
import "../style/index.css";
import Picker from "emoji-picker-react";
import { BsEmojiSmileFill } from "react-icons/bs";

const borderRadius = 8;
const primary = "#202329";

function MeetingChat({}) {
  const { publish, messages } = usePubSub("CHAT", {});
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let mess = message;
    mess += emojiObject.emoji;
    setMessage(mess);
  };

  const sendChat = () => {
    const m = message;
    if (m.length) {
      publish(m, { persist: true });
      setMessage("");
    }
  };

  return (
    <div
      style={{
        marginLeft: borderRadius,
        width: 400,
        backgroundColor: primary,
        height: "100%",
        position: "relative",
      }}
    >
      <div style={{ height: "84vh" }} className="message-list">
        <MessageList messages={messages} />
      </div>
      {showEmojiPicker && (
        <div className="picker" style={{ position: "absolute", top: "30%" }}>
          <Picker onEmojiClick={handleEmojiClick} />
        </div>
      )}
      <div style={{ display: "flex" }} className="mess-type">
        <div
          className="input-field"
          style={{ position: "relative", width: "70%" }}
        >
          <div className="button-container">
            <div
              className="emoji"
              style={{
                position: "absolute",
                top: 4,
                right: 10,
                cursor: "pointer",
                color: showEmojiPicker ? "#38c180" : "#a3a3a5",
              }}
            >
              <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
            </div>
          </div>
          <input
            style={{ width: "100%" }}
            className="message-input"
            value={message}
            placeholder="Type a message..."
            onChange={(e) => {
              const v = e.target.value;
              setMessage(v);
            }}
          />
        </div>
        <button
          className={"button default send-button"}
          onClick={sendChat}
          style={{ width: "20%" }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default MeetingChat;
