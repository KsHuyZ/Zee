import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import { useRef, useEffect, useMemo } from "react";
import ReactPlayer from "react-player";
import CircularProgress from "@mui/material/CircularProgress";
import ScreenShare from "./ScreenShare";

const chunk = (arr) => {
  const newArr = [];
  while (arr.length) newArr.push(arr.splice(0, 3));
  return newArr;
};

const ParticipantView = ({ participantId, isLoading }) => {
  const webcamRef = useRef(null);
  const micRef = useRef(null);
  const screenShareRef = useRef(null);

  const onStreamEnabled = (stream) => {};
  const onStreamDisabled = (stream) => {};

  const {
    displayName,
    participant,
    webcamStream,
    micStream,
    screenShareStream,
    webcamOn,
    micOn,
    screenShareOn,
    isLocal,
    isActiveSpeaker,
    isMainParticipant,
    switchTo,
    pinState,
    setQuality,
    setViewPort,
    enableMic,
    disableMic,
    enableWebcam,
    disableWebcam,
    pin,
    unpin,
  } = useParticipant(participantId, {
    onStreamEnabled,
    onStreamDisabled,
  });

  useEffect(() => {
    if (webcamRef.current && !isLocal && webcamStream) {
      setViewPort(
        webcamRef.current.wrapper.offsetWidth,
        webcamRef.current.wrapper.offsetHeight
      );
    }
  }, [
    webcamRef.current?.offsetHeight,
    webcamRef.current?.offsetWidth,
    webcamStream,
  ]);

  const webcamMediaStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  const screenShareMediaStream = useMemo(() => {
    if (screenShareOn) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(screenShareStream.track);
      return mediaStream;
    }
  }, [screenShareStream, screenShareOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) => console.error("mic  play() failed", error));
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div
      style={{
        width: 400,
        backgroundColor: "#202329",
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
      <audio ref={micRef} autoPlay muted={isLocal} />

      <div
        style={{
          position: "relative",
          borderRadius: 8,
          overflow: "hidden",
          width: "100%",
          height: 300,
        }}
      >
        <div
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <>
            <ReactPlayer
              ref={webcamRef}
              playsinline // very very imp prop
              playIcon={<></>}
              pip={false}
              light={false}
              controls={false}
              muted={true}
              playing={true}
              url={webcamMediaStream}
              //
              height={"100%"}
              width={"100%"}
              onError={(err) => {
                console.log(err, "participant video error");
              }}
            />
          </>
          <div
            style={{
              position: "absolute",
              top: "48%",
              left: "48%",
            }}
          >
            {!isLoading && <CircularProgress />}
          </div>

          {/* <div
              style={{
                position: "absolute",
                top: 30,
                left: 30,
              }}
            >
              <button
                className="button blue"
                style={
                  {
                    // height: 50,
                    // width: 200,
                  }
                }
                onClick={async () => {
                  const meetingId = prompt(
                    `Please enter meeting id where you want to switch ${displayName}`
                  );
                  const token = await getToken();
                  if (meetingId && token) {
                    try {
                      await switchTo({
                        meetingId,
                        payload: "Im Switching",
                        token: token,
                      });
                    } catch (e) {
                      console.log("swithc To Error", e);
                    }
                  } else {
                    alert("Empty meetingId!");
                  }
                }}
              >
                Switch Participant
              </button>
            </div> */}
        </div>
      </div>

      {screenShareOn && (
        <ScreenShare
          screenShareMediaStream={screenShareMediaStream}
          screenShareOn={screenShareOn}
        />
      )}
    </div>
  );
};

const ParticipantsView = ({ isLoading }) => {
  const { participants } = useMeeting();

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        padding: 8,
      }}
    >
      {chunk([...participants.keys()]).map((k, index) => (
        <div style={{ display: "flex" }}>
          {k.map((l) => (
            <ParticipantView
              key={index}
              participantId={l}
              isLoading={isLoading}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ParticipantsView;
