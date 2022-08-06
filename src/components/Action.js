import React from "react";
// import { MicOutlinedIcon, CallEndIcon } from "@mui/icons-material";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import VolumeOffOutlinedIcon from "@mui/icons-material/VolumeOffOutlined";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import PresentToAllOutlinedIcon from "@mui/icons-material/PresentToAllOutlined";
import "../style/index.css";
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
}) {
  return (
    // <div style={{ height: 120 }}>
    //   <button className={"button red"} onClick={leave}>
    //     LEAVE
    //   </button>
    //   <button className={"button blue"} onClick={toggleMic}>
    //     toggleMic
    //   </button>
    //   <button
    //     className={"button blue"}
    //     onClick={() => {
    //       toggleWebcam();
    //     }}
    //   >
    //     toggleWebcam
    //   </button>
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
        <div className="camera icon">
          <VideocamOutlinedIcon />
        </div>
        <div className="mic icon">
          <MicOutlinedIcon />
        </div>
        <div className="end-call">
          <span style={{ color: "white" }}>End call</span>
        </div>
        <div className="full-screen icon">
          <FullscreenOutlinedIcon />
        </div>
        <div className="present icon">
          <PresentToAllOutlinedIcon />
        </div>
        <div className="more icon">
          <MoreHorizOutlinedIcon />
        </div>
      </div>
    </div>
  );
}
