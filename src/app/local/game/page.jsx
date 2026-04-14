"use client";

import Board from "@/components/ludo/Board";
import Dice from "@/components/ludo/Dice";
import Token from "@/components/ludo/Tokens";
import React, { useEffect, useState } from "react";

export default function Ludo() {
  const [size, setSize] = useState(0);
  const [max, setMax] = useState(0);
console.log('ludo')
  useEffect(() => {
    // 2. This code ONLY runs in the browser
    const handleResize = () => {
      const h = window.innerHeight;
      const w = window.innerWidth;
      setSize(Math.min(h, w));
      (h > w) ? setMax(0) : setMax(1)
    };

    // Set initial size
    handleResize();

    // 3. Optional: Update size if user resizes window
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative flex h-dvh w-screen items-center justify-center">
      <div className="absolute">
        <div className={`z-10 absolute ${max === 0 ? 'right-0 -bottom-20' : '-right-20 bottom-0'}`}>
        <Dice />
      </div>
        <Board size={size} />
      </div>
      <div className="absolute">
        <Token size={size} />
      </div>
    </div>
  );
}
