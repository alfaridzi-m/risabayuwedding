"use client";

import { useEffect, useState } from "react";

export function useTyping(text: string, active: boolean, speed = 130) {
  const [display, setDisplay] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active || done) return;

    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplay(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(timer);
        setDone(true);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [active, done, text, speed]);

  return { display, done, showCaret: active && !done };
}
