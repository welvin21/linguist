import React, { FC, useEffect, useRef, useState } from "react";

import { ImageInputTensor } from "../types/ImageInputTensor";

interface WebcamProps {
  fps: number;
  setImageInputTensor: (data: ImageInputTensor) => void;
  running: boolean;
  setRunning: (running: boolean) => void;
}

export const Webcam: FC<WebcamProps> = ({
  fps,
  setImageInputTensor,
  running,
  setRunning,
}) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const boxRef = useRef(null);

  const height = 480;
  const width = 640;
  const top = height / 4;
  const left = 0;
  const canvasScaleFactor = 51 / 480;

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
    canvasRef.current.width = width * canvasScaleFactor;
    // @ts-ignore
    canvasRef.current.height = height * canvasScaleFactor;

    canvasContext.drawImage(
      videoRef.current,
      0,
      0,
      width * canvasScaleFactor,
      height * canvasScaleFactor
    );

    const imagePixels = canvasContext.getImageData(
      left * canvasScaleFactor,
      top * canvasScaleFactor,
      28,
      28
    );

    const imageInputTensor: ImageInputTensor = Array(28)
      .fill(null)
      .map(() =>
        Array(28)
          .fill(null)
          .map(() => [0])
      );

    for (let y = 0; y < imagePixels.height; y++) {
      for (let x = 0; x < imagePixels.width; x++) {
        const i = y * 4 * imagePixels.width + x * 4;
        const avg =
          (imagePixels.data[i] +
            imagePixels.data[i + 1] +
            imagePixels.data[i + 2]) /
          3;
        imagePixels.data[i] = avg;
        imagePixels.data[i + 1] = avg;
        imagePixels.data[i + 2] = avg;

        const grayscale =
          imagePixels.data[i] * 0.299 +
          imagePixels.data[i + 1] * 0.587 +
          imagePixels.data[i + 2] * 0.114;

        imageInputTensor[y][x][0] = grayscale / 255;
      }
    }
    console.log(imageInputTensor);

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

    setImageInputTensor(imageInputTensor);
  };

  useEffect(() => {
    if (!canvasRef || !canvasRef.current || !videoRef || !running) return;

    const loop = setInterval(() => {
      takePicture();
    }, 1000 / fps);

    return () => clearInterval(loop);
  }, [fps, running]);

  return (
    <div>
      <div
        className={"mx-auto"}
        style={{ position: "relative", width: "fit-content" }}
      >
        <video
          ref={videoRef}
          playsInline
          autoPlay
          height={height}
          width={width}
          style={{ transform: "scaleX(-1)" }}
        />
        <div
          className={"border-2 border-green-500"}
          style={{
            position: "absolute",
            top,
            right: left,
            width: 256,
            height: 256,
          }}
        />
        <canvas className={"absolute left-0 bottom-0"} ref={boxRef} />
        <button
          className={`absolute bottom-0 right-0 px-4 py-2 m-2 ${
            running
              ? "bg-red-500 hover:bg-red-400"
              : "bg-green-500 hover:bg-green-400"
          } text-white rounded focus:outline-none`}
          onClick={() => setRunning(!running)}
        >
          {running ? "stop" : "start"}
        </button>
      </div>
      <canvas className={"hidden"} ref={canvasRef} />
    </div>
  );
};
