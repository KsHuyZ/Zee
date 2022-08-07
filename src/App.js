import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  // useMeeting,
  // useParticipant,
  // useConnection,
  // usePubSub,
} from "@videosdk.live/react-sdk";

// Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { JoiningScreen } from "./components/JoiningScreen";

import MeetingView from "./components/MeetingView";

// const primary = "#19191e";

const width = 400;
// const height = (width * 2) / 3;
// const borderRadius = 8;

const chunk = (arr) => {
  const newArr = [];
  while (arr.length) newArr.push(arr.splice(0, 3));
  return newArr;
};

// const Title = ({ title, dark }) => {
//   return <h2 style={{ color: dark ? primary : "#fff" }}>{title}</h2>;
// };

const App = () => {
  const [token, setToken] = useState("");
  const [meetingId, setMeetingId] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [micOn, setMicOn] = useState(false);
  const [webcamOn, setWebcamOn] = useState(false);
  const [isMeetingStarted, setMeetingStarted] = useState(false);

  return isMeetingStarted ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: micOn,
        webcamEnabled: webcamOn,
        name: participantName ? participantName : "TestUser",
      }}
      token={token}
      reinitialiseMeetingOnConfigChange={true}
      joinWithoutUserInteraction={true}
    >
      <MeetingView
        webcamOn={webcamOn}
        setWebcamOn={setWebcamOn}
        setMicOn={setMicOn}
        micOn={micOn}
        onNewMeetingIdToken={({ meetingId, token }) => {
          setMeetingId(meetingId);
          setToken(token);
        }}
        onMeetingLeave={() => {
          setToken("");
          setMeetingId("");
          setWebcamOn(false);
          setMicOn(false);
          setMeetingStarted(false);
        }}
      />
    </MeetingProvider>
  ) : (
    <JoiningScreen
      participantName={participantName}
      setParticipantName={setParticipantName}
      meetinId={meetingId}
      setMeetingId={setMeetingId}
      setToken={setToken}
      setMicOn={setMicOn}
      micOn={micOn}
      webcamOn={webcamOn}
      setWebcamOn={setWebcamOn}
      onClickStartMeeting={() => {
        setMeetingStarted(true);
      }}
      startMeeting={isMeetingStarted}
    />
  );
};

export default App;
