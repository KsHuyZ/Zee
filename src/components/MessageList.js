function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

export const MessageList = ({ messages }) => {
  return (
    <div>
      {messages?.map((message, i) => {
        const { senderName, message: text, timestamp } = message;

        return (
          <div className="mess-list">
            <p style={{ margin: 0, padding: 0 }}>{senderName}</p>
            <div
              style={{
                margin: 8,
                backgroundColor: "#181a1e",
                borderRadius: 8,
                width: "80%",
                overflow: "hidden",
                padding: 8,
                color: "#fff",
              }}
              key={i}
            >
              <h3 style={{ margin: 0, padding: 0, marginTop: 4 }}>{text}</h3>
              <p
                style={{
                  margin: 0,
                  padding: 0,
                  opacity: 0.6,
                  marginTop: 4,
                }}
              >
                {formatAMPM(new Date(timestamp))}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
