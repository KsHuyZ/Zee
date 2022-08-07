import React, { useState } from "react";
// import { MicOutlinedIcon, CallEndIcon } from "@mui/icons-material";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import VolumeOffOutlinedIcon from "@mui/icons-material/VolumeOffOutlined";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import PresentToAllOutlinedIcon from "@mui/icons-material/PresentToAllOutlined";
import "../style/index.css";
import VideocamOffOutlinedIcon from "@mui/icons-material/VideocamOffOutlined";
import MicOffOutlinedIcon from "@mui/icons-material/MicOffOutlined";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

var elem = document.documentElement;

export default function Action({
  leave,
  toggleMic,
  toggleWebcam,
  toggleScreenShare,
  handlestartVideo,
  handlestopVideo,
  handleresumeVideo,
  handlepauseVideo,
  handlesseekVideo,
  handleStartLiveStream,
  handleStopLiveStream,
  handleStartRecording,
  handleStopRecording,
  setParticipantViewVisible,
  connectMetting,
  participantViewVisible,
  connectTo,
  micOn,
  setMicOn,
  webcamOn,
  setWebCamOn,
}) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [present, setPresent] = useState(false);

  const goFullScreen = () => {
    setIsFullScreen(true);
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  };

  const closeScreen = async () => {
    setIsFullScreen(false);
    if (!document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
  };

  return (
    // <div style={{ height: 120 }}>

    //

    //   <button className={"button blue"} onClick={toggleScreenShare}>
    //     toggleScreenShare
    //   </button>
    //   <button className={"button blue"} onClick={handlestartVideo}>
    //     startVideo
    //   </button>
    //   <button className={"button blue"} onClick={handlestopVideo}>
    //     stopVideo
    //   </button>
    //   <button className={"button blue"} onClick={handleresumeVideo}>
    //     resumeVideo
    //   </button>
    //   <button className={"button blue"} onClick={handlepauseVideo}>
    //     pauseVideo
    //   </button>
    //   <button className={"button blue"} onClick={handlesseekVideo}>
    //     seekVideo
    //   </button>
    //   <button className={"button blue"} onClick={handleStartLiveStream}>
    //     Start Live Stream
    //   </button>
    //   <button className={"button blue"} onClick={handleStopLiveStream}>
    //     Stop Live Stream
    //   </button>
    //   <button className={"button blue"} onClick={handleStartRecording}>
    //     start recording
    //   </button>
    //   <button className={"button blue"} onClick={handleStopRecording}>
    //     stop recording
    //   </button>
    //   <button
    //     className={"button blue"}
    //     onClick={() => setParticipantViewVisible((s) => !s)}
    //   >
    //     Switch to {participantViewVisible ? "Connections" : "Participants"} view
    //   </button>

    //   <button
    //     className={"button blue"}
    //     onClick={async () => {
    //       const meetingId = prompt(
    //         `Please enter meeting id where you want Connect`
    //       );
    //       if (meetingId) {
    //         try {
    //           await connectTo({
    //             meetingId,
    //             payload: "This is Testing Payload",
    //           });
    //         } catch (e) {
    //           console.log("Connect to Error", e);
    //         }
    //       } else {
    //         alert("Empty meetingId!");
    //       }
    //     }}
    //   >
    //     Make Connections
    //   </button>
    // </div>
    <div className="action">
      <div className="action-bar">
        <div className="muted icon">
          <VolumeOffOutlinedIcon />
        </div>
        <div
          className="camera icon"
          onClick={() => {
            setWebCamOn((prev) => !prev);
            toggleWebcam();
          }}
        >
          {webcamOn ? <VideocamOutlinedIcon /> : <VideocamOffOutlinedIcon />}
        </div>
        <div
          className="mic icon"
          onClick={() => {
            setMicOn((prev) => !prev);
            toggleMic();
          }}
        >
          {!micOn ? <MicOffOutlinedIcon /> : <MicOutlinedIcon />}
        </div>
        <div className="end-call icon" onClick={leave}>
          <span style={{ color: "white" }}>End call</span>
        </div>
        <div
          className="full-screen icon"
          onClick={!isFullScreen ? goFullScreen : closeScreen}
        >
          {!isFullScreen ? (
            <FullscreenOutlinedIcon />
          ) : (
            <FullscreenExitOutlinedIcon />
          )}
        </div>
        <div className="present icon" onClick={toggleScreenShare}>
          {!present ? <PresentToAllOutlinedIcon /> : <CancelPresentationIcon />}
        </div>
        <div className="more icon">
          <MoreHorizOutlinedIcon />
        </div>
      </div>
    </div>
  );
}
