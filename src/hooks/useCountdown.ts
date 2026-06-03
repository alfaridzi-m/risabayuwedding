"use client";

import { useEffect, useState } from "react";
import { WEDDING_DATE } from "@/lib/constants";

function pad(n: number) {
  return n < 10 ? `0${n}` : String(n);
}

export function useCountdown() {
  const [values, setValues] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const tick = () => {
      const diff = WEDDING_DATE.getTime() - Date.now();
      if (diff <= 0) {
        setValues({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setValues({
        days: pad(d),
        hours: pad(h),
        minutes: pad(m),
        seconds: pad(s),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return values;
}
