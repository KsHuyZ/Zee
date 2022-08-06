import { usePubSub } from "@videosdk.live/react-sdk";
import React, { useState } from "react";
import { MessageList } from "./MessageList";
import "../style/index.css";
import Picker from "emoji-picker-react";
import { BsEmojiSmileFill } from "react-icons/bs";

const borderRadius = 8;
const primary = "#202329";

function MeetingChat({ tollbarHeight }) {
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
        overflowY: "scroll",
        height: "100%",
      }}
    >
      <div style={{ height: "90%" }} className="mess-list">
        <MessageList messages={messages} />
      </div>

      <div style={{ display: "flex" }} className="mess-type">
        <div className="input-field" >
          <div className="button-container">
            <div
              className="emoji"
              style={{
                position: "absolute",
                top: 4,
                right: 10,
                cursor: "pointer",
                color: showEmojiPicker ? "#a3a3a5" : "",
              }}
            >
              <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />

              {showEmojiPicker && (
                <div
                  className="picker"
                  style={{ position: "absolute", top: 0, left: 0 }}
                >
                  <Picker onEmojiClick={handleEmojiClick} />
                </div>
              )}
            </div>
          </div>
          <input
            className="message-input"
            value={message}
            placeholder="Type a message..."
            onChange={(e) => {
              const v = e.target.value;
              setMessage(v);
            }}
          />
        </div>
        <button className={"button default send-button"} onClick={sendChat}>
          Send
        </button>
      </div>
    </div>
  );
}

export default MeetingChat;
