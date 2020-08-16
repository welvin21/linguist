import React, { FC, useEffect } from "react";

interface CaptionProps {
  start: boolean;
  text: string;
  setText: (text: string) => void;
}

export const Caption: FC<CaptionProps> = ({ start, text, setText }) => {
  const characters = ["h", "e", "l", "l", "o", "w", "o", "r", "l", "d"];

  // useEffect(() => {
  //   if (start && text.length < characters.length) {
  //     const loop = setTimeout(() => {
  //       setText(`${text}${characters[text.length]}`);
  //     }, 750);
  //     return () => clearTimeout(loop);
  //   }
  // }, [text, start]);

  return (
    <div className={"mx-auto max-w-lg overflow-hidden"}>
      <p className={"text-center"} style={{ direction: "rtl" }}>
        {text}
      </p>
    </div>
  );
};
