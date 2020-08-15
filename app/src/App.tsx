import React from "react";
import * as tf from "@tensorflow/tfjs";
import logo from "./logo.svg";
import "./App.css";

import { useModel } from "./custom-hooks";

const getPrediction = async (
  model: any,
  dataMatrix: number[][][][]
): Promise<void> => {
  const mockDataTensor = tf.tensor(dataMatrix, [1, 28, 28, 1]);

  if (model) {
    const prediction = await model.predict(mockDataTensor).array();
    console.log({ prediction });
  }
};

function App() {
  const [model] = useModel();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
