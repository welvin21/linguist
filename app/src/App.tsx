import React, { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

import { useModel } from "./custom-hooks";
import { sampleData } from "./data/sampleData";
import { alphabets } from "./data/alphabets";
import { generateRandomData } from "./data/generateRandomData";
import { Webcam } from "./components/Webcam";
import { Caption } from "./components/Caption";
import { ImageInputTensor } from "./types/ImageInputTensor";

import logo from "./linguist-logo.png";

const getPrediction = async (
  model: any,
  dataMatrix: number[][][][]
): Promise<number[] | null> => {
  const now = new Date().getTime();
  const mockDataTensor = tf.tensor(dataMatrix, [dataMatrix.length, 28, 28, 1]);

  if (model) {
    const prediction = await model.predict(mockDataTensor).array();
    const scores = await tf.tensor2d(prediction).argMax(1).array();
    const duration = new Date().getTime() - now;
    console.log({ prediction, scores, duration });
    // @ts-ignore
    return scores;
  }
  return null;
};

function App() {
  const [model] = useModel();

  const [data, setData] = useState<ImageInputTensor[]>([]);

  const [running, setRunning] = useState<boolean>(false);

  const [text, setText] = useState<string>("");

  useEffect(() => {
    if (data.length) {
      getPrediction(model, data).then((result) => {
        if (result) {
          // @ts-ignore
          const index = result[0];
          const character = alphabets[index];
          console.log(character);
          setText(`${text}${character}`);
        }
      });
    }
  }, [model, data]);

  return (
    <div className={"p-6"}>
      <div className={"flex justify-center items-center"}>
        <img src={logo} alt={"logo"} className={"h-6 w-auto"} />
        <h1 className={"mt-1 text-xl"}>inguist</h1>
      </div>

      <div className={"mt-4"}>
        <Webcam
          fps={1}
          setImageInputTensor={(imageInputTensor) =>
            setData([imageInputTensor])
          }
          running={running}
          setRunning={setRunning}
        />
      </div>

      <div className={"mt-6"}>
        <Caption start={running} text={text} setText={setText} />
      </div>
    </div>
  );
}

export default App;
