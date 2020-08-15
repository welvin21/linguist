import { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

export const useModel = () => {
  const modelURL = "http://localhost:8000/model.json";
  const [model, setModel] = useState<any>(null);

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const model = await tf.loadLayersModel(modelURL);
        setModel(model);
      } catch (error) {
        console.log({ error });
      }
    };

    fetchModel();
  }, [modelURL]);

  return [model];
};
