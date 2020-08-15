import React, { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

import { useModel } from "./custom-hooks";
import { sampleData } from "./data/sampleData";
import { alphabets } from "./data/alphabets";
import { generateRandomData } from "./data/generateRandomData";
import { Webcam } from "./components/Webcam";

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

  const [data, setData] = useState([generateRandomData()]);

  useEffect(() => {
    getPrediction(model, data).then((result) => {
      console.log(result);
    });
  }, [model, data]);

  return (
    <div>
      <Webcam fps={10} setImageInputTensor={(imageInputTensor) => {}} />
    </div>
  );
}

export default App;
