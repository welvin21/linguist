import React, { FC, useEffect, useState } from "react";

interface CaptionProps {
  start: boolean;
}

export const Caption: FC<CaptionProps> = ({ start }) => {
  const characters = ["h", "e", "l", "l", "o", "w", "o", "r", "l", "d"];

  const [text, setText] = useState<string>("");

  useEffect(() => {
    if (start && text.length < characters.length) {
      const loop = setTimeout(() => {
        setText(`${text}${characters[text.length]}`);
      }, 750);
      return () => clearTimeout(loop);
    }
  }, [text, start]);

  return <div className={"text-center text-xl"}>{text}</div>;
};
