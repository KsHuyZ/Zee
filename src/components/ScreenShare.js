import React, { useRef } from "react";
import ReactPlayer from "react-player";

function ScreenShare({ screenShareMediaStream, screenShareOn }) {
  const borderRadius = 8;
  const screenShareRef = useRef(null);
  return (
    <div
      style={{
        marginTop: borderRadius,
        position: "relative",
        borderRadius: borderRadius,
        overflow: "hidden",
        backgroundColor: "black",
        width: "100%",
        height: 300,
      }}
    >
      <div
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <>
          <ReactPlayer
            ref={screenShareRef}
            //
            playsinline // very very imp prop
            playIcon={<></>}
            //
            pip={false}
            light={false}
            controls={false}
            muted={true}
            playing={true}
            //
            url={screenShareMediaStream}
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
            top: borderRadius,
            right: borderRadius,
          }}
        >
          <p
            style={{
              color: screenShareOn ? "green" : "red",
              fontSize: 16,
              fontWeight: "bold",
              opacity: 1,
            }}
          >
            SCREEN SHARING
          </p>
        </div>
      </div>
    </div>
  );
}

export default ScreenShare;
