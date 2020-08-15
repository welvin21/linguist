import React, { FC, useEffect, useRef } from "react";
// import * as cv from 'opencv';

import { ImageInputTensor } from "../types/ImageInputTensor";

interface WebcamProps {
  fps: number;
  setImageInputTensor: (data: ImageInputTensor) => void;
}

export const Webcam: FC<WebcamProps> = ({ fps, setImageInputTensor }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const boxRef = useRef(null);

  const height = 51;
  const width = 68;

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: false, video: true })
      .then((stream) => {
        if (videoRef && videoRef.current) {
          // @ts-ignore
          videoRef.current.srcObject = stream;
        }
      })
      .catch((e) => console.log("get user media error", e));
  }, []);

  const takePicture = () => {
    // @ts-ignore
    const canvasContext = canvasRef.current.getContext("2d");
    // @ts-ignore
    canvasRef.current.width = width;
    // @ts-ignore
    canvasRef.current.height = height;

    canvasContext.drawImage(videoRef.current, 0, 0, width, height);

    const imagePixels = canvasContext.getImageData(2, 10, 28, 28);

    // @ts-ignore
    boxRef.current.width = 28;
    // @ts-ignore
    boxRef.current.height = 28;
    // @ts-ignore
    boxRef.current
      .getContext("2d")
      .putImageData(
        imagePixels,
        0,
        0,
        0,
        0,
        imagePixels.width,
        imagePixels.height
      );
  };

  useEffect(() => {
    if (!canvasRef || !canvasRef.current || !videoRef) return;

    const loop = setInterval(() => {
      takePicture();
    }, 1000 / fps);

    return () => clearInterval(loop);
  }, [fps]);

  return (
    <div>
      <div style={{ position: "relative" }}>
        <video
          ref={videoRef}
          playsInline
          autoPlay
          height={height}
          width={width}
        />
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 2,
            width: 28,
            height: 28,
            border: "1px solid blue",
          }}
        />
      </div>
      <canvas style={{ display: "block" }} ref={canvasRef} />
      <canvas style={{ display: "block" }} ref={boxRef} />
    </div>
  );
};
