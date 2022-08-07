import React, { useRef, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  useConnection,
  usePubSub,
} from "@videosdk.live/react-sdk";
import ParticipantsView from "./ParticipantsView";
import MeetingChat from "./MeetingChat";
import Action from "./Action";
import ConnectionsView from "./ConnectionViews";

const ExternalVideo = () => {
  const [{ link, playing }, setVideoInfo] = useState({
    link: null,
    playing: false,
  });

  const onVideoStateChanged = (data) => {
    const { currentTime, link, status } = data;

    switch (status) {
      case "stopped":
        console.log("stopped in switch");
        externalPlayer.current.src = null;
        setVideoInfo({ link: null, playing: false });
        break;
      case "resumed":
        if (typeof currentTime === "number") {
          externalPlayer.current.currentTime = currentTime;
        }
        externalPlayer.current.play();
        setVideoInfo((s) => ({ ...s, playing: true }));
        break;
      case "paused":
        externalPlayer.current.pause();
        setVideoInfo((s) => ({ ...s, playing: false }));
        break;
      case "started":
        setVideoInfo({ link, playing: true });
        break;
      default:
        break;
    }
  };

  const onVideoSeeked = (data) => {
    const { currentTime } = data;
    if (typeof currentTime === "number") {
      externalPlayer.current.currentTime = currentTime;
    }
  };

  useMeeting({ onVideoStateChanged, onVideoSeeked });
  const externalPlayer = useRef();

  return !link ? null : (
    <div
      style={{
        borderRadius: 8,
        padding: 8,
        margin: 8,
        backgroundColor: "#19191e",
        display: "flex",
      }}
    >
      {/* <Title title={"Externam Video"} /> */}

      <video
        style={{
          borderRadius: 8,
          height: 800 / 3,
          width: 400,
          backgroundColor: "black",
        }}
        autoPlay
        ref={externalPlayer}
        src={link}
      />
    </div>
  );
};

function MeetingView({
  setMicOn,
  micOn,
  onNewMeetingIdToken,
  onMeetingLeave,
  webcamOn,
  setWebcamOn,
}) {
  const [participantViewVisible, setParticipantViewVisible] = useState(true);
  const [isLoadingCamera, setIsLoadingCamera] = useState(false);
  function onParticipantJoined(participant) {
    console.log(" onParticipantJoined", participant);
  }
  function onParticipantLeft(participant) {
    console.log(" onParticipantLeft", participant);
  }
  const onSpeakerChanged = (activeSpeakerId) => {
    console.log(" onSpeakerChanged", activeSpeakerId);
  };
  function onPresenterChanged(presenterId) {
    console.log(" onPresenterChanged", presenterId);
  }
  function onMainParticipantChanged(participant) {
    console.log(" onMainParticipantChanged", participant);
  }
  function onEntryRequested(participantId, name) {
    console.log(" onEntryRequested", participantId, name);
  }
  function onEntryResponded(participantId, name) {
    console.log(" onEntryResponded", participantId, name);
    setIsLoadingCamera(true);
  }
  function onRecordingStarted() {
    console.log(" onRecordingStarted");
  }
  function onRecordingStopped() {
    console.log(" onRecordingStopped");
  }
  function onChatMessage(data) {
    console.log(" onChatMessage", data);
  }
  function onMeetingJoined() {
    console.log("onMeetingJoined");
  }
  function onMeetingLeft() {
    console.log("onMeetingLeft");
    onMeetingLeave();
  }
  const onLiveStreamStarted = (data) => {
    console.log("onLiveStreamStarted example", data);
  };
  const onLiveStreamStopped = (data) => {
    console.log("onLiveStreamStopped example", data);
  };

  const onVideoStateChanged = (data) => {
    console.log("onVideoStateChanged", data);
  };
  const onVideoSeeked = (data) => {
    console.log("onVideoSeeked", data);
  };

  const onWebcamRequested = (data) => {
    console.log("onWebcamRequested", data);
  };
  const onMicRequested = (data) => {
    console.log("onMicRequested", data);
  };
  const onPinStateChanged = (data) => {
    console.log("onPinStateChanged", data);
  };
  const onSwitchMeeting = (data) => {
    window.focus();
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure you want to switch Meeting ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            onNewMeetingIdToken(data);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const onConnectionOpen = (data) => {
    console.log("onConnectionOpen", data);
  };

  const {
    meetingId,
    meeting,
    localParticipant,
    mainParticipant,
    activeSpeakerId,
    participants,
    presenterId,
    localMicOn,
    localWebcamOn,
    localScreenShareOn,
    messages,
    isRecording,
    isLiveStreaming,
    pinnedParticipants,
    //
    join,
    leave,
    connectTo,
    end,
    //
    startRecording,
    stopRecording,
    //
    respondEntry,
    //
    muteMic,
    unmuteMic,
    toggleMic,
    //
    disableWebcam,
    enableWebcam,
    toggleWebcam,
    //
    disableScreenShare,
    enableScreenShare,
    toggleScreenShare,
    //
    getMics,
    getWebcams,
    changeWebcam,
    changeMic,

    startVideo,
    stopVideo,
    resumeVideo,
    pauseVideo,
    seekVideo,
    startLivestream,
    stopLivestream,
  } = useMeeting({
    onParticipantJoined,
    onParticipantLeft,
    onSpeakerChanged,
    onPresenterChanged,
    onMainParticipantChanged,
    onEntryRequested,
    onEntryResponded,
    onRecordingStarted,
    onRecordingStopped,
    onChatMessage,
    onMeetingJoined,
    onMeetingLeft,
    onLiveStreamStarted,
    onLiveStreamStopped,
    onVideoStateChanged,
    onVideoSeeked,
    onWebcamRequested,
    onMicRequested,
    onPinStateChanged,
    onSwitchMeeting,
    onConnectionOpen,
  });
  console.log("meeting id", meetingId);
  const handlestartVideo = () => {
    console.log("handlestartVideo");

    startVideo({
      link: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    });
  };

  const handlestopVideo = () => {
    stopVideo();
  };
  const handleresumeVideo = () => {
    resumeVideo();
  };
  const handlepauseVideo = () => {
    pauseVideo({ currentTime: 2 });
  };
  const handlesseekVideo = () => {
    seekVideo({ currentTime: 5 });
  };
  const handleStartLiveStream = () => {
    startLivestream([
      {
        url: "rtmp://a.rtmp.youtube.com/live2",
        streamKey: "key",
      },
    ]);
  };
  const handleStopLiveStream = () => {
    stopLivestream();
  };
  const handleStartRecording = () => {
    startRecording();
  };
  const handleStopRecording = () => {
    stopRecording();
  };

  const tollbarHeight = 120;

  const connectMetting = async () => {
    const meetingId = prompt(`Please enter meeting id where you want Connect`);
    if (meetingId) {
      try {
        await connectTo({
          meetingId,
          payload: "This is Testing Payload",
        });
      } catch (e) {
        console.log("Connect to Error", e);
      }
    } else {
      alert("Empty meetingId!");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#202329",
        height: "100vh",
      }}
    >
      <div style={{ color: "white" }}> Meeting id: {meetingId}</div>
      <div style={{ display: "flex", flex: 1, height: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            flex: 1,
            justifyContent: "space-around",
            height: `100%`,
          }}
        >
          <ExternalVideo />

          {participantViewVisible ? (
            <ParticipantsView isLoading={isLoadingCamera} />
          ) : (
            <ConnectionsView />
          )}
          <Action
            leave={leave}
            toggleMic={toggleMic}
            toggleWebcam={toggleWebcam}
            toggleScreenShare={toggleScreenShare}
            handlestartVideo={handlestartVideo}
            handlestopVideo={handlestopVideo}
            handleresumeVideo={handleresumeVideo}
            handlepauseVideo={handlepauseVideo}
            handlesseekVideo={handlesseekVideo}
            handleStartLiveStream={handleStartLiveStream}
            handleStopLiveStream={handleStopLiveStream}
            handleStartRecording={handleStartRecording}
            handleStopRecording={handleStopRecording}
            setParticipantViewVisible={setParticipantViewVisible}
            participantViewVisible={participantViewVisible}
            connectMetting={connectMetting}
            connectTo={connectTo}
            micOn={micOn}
            setMicOn={setMicOn}
            webcamOn={webcamOn}
            setWebCamOn={setWebcamOn}
          />
        </div>
        <MeetingChat tollbarHeight={tollbarHeight} />
      </div>
    </div>
  );
}
export default MeetingView;
