import { useConnection, useMeeting } from "@videosdk.live/react-sdk";
import React from "react";
import { getToken } from "../api";

const chunk = (arr) => {
    const newArr = [];
    while (arr.length) newArr.push(arr.splice(0, 3));
    return newArr;
  };

const ConnectionView = ({ connectionId }) => {
    const { connection } = useConnection(connectionId, {
      onMeeting: {
        onChatMessage: ({ message, participantId }) => {
          alert(
            `A Person ${participantId} from ${connectionId} Wants to say : ${message}`
          );
        },
      },
    });
  
    const connectionParticipants = [...connection.meeting.participants.values()];
  
    const ConnectionParticipant = ({ participant }) => {
      return (
        <div style={{ padding: 4, border: "1px solid blue" }}>
          <p>{participant.displayName}</p>
          <button
            onClick={async () => {
              const meetingId = prompt(
                `In Which meetingId you want to switch ${participant.displayName} ?`
              );
              const payload = prompt("enter payload you want to pass");
  
              const token = await getToken();
              if ((meetingId, token, payload)) {
                participant
                  .switchTo({ meetingId, token, payload })
                  .catch(console.log);
              } else {
                alert("Empty meetingId or payload ");
              }
            }}
            className={"button "}
          >
            Switch
          </button>
        </div>
      );
    };
  
    return (
      <div
        style={{
          width: 400,
          backgroundColor: "#19191e",
          borderRadius: 8,
          overflow: "hidden",
          margin: 8,
          padding: 8,
          display: "flex",
          flex: 1,
          flexDirection: "column",
          position: "relative",
        }}
      >
        <button
          onClick={() => {
            connection.close();
          }}
          className={"button"}
        >
          Close Connection
        </button>
  
        <button
          onClick={() => {
            const message = prompt("Enter You Message");
            if (message) {
              connection.meeting.sendChatMessage(message);
            } else {
              alert("Empty Message ");
            }
          }}
          className={"button"}
        >
          Send Meessage
        </button>
  
        <button
          onClick={() => {
            connection.meeting.end();
          }}
          className={"button"}
        >
          End Meeting
        </button>
        <p>
          {connection.id} : {connection.payload}
        </p>
        {connectionParticipants.map((participant) => {
          return (
            <ConnectionParticipant
              key={`${connection.id}_${participant.id}`}
              participant={participant}
            />
          );
        })}
      </div>
    );
  };
  
  const ConnectionsView = () => {
    const { connections, meetingId } = useMeeting();
    console.log("meeting id:", meetingId);
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          padding: 8,
        }}
      >
      
        {chunk([...connections.keys()]).map((k) => (
          <div style={{ display: "flex" }} key={k}>
            {k.map((l) => (
              <ConnectionView key={`${meetingId}_${l}`} connectionId={l} />
            ))}
          </div>
        ))}
      </div>
    );
  };

  export default ConnectionsView