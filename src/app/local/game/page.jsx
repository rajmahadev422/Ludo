"use client";

import Board from "@/components/ludo/Board";
import Token from "@/components/ludo/Tokens";
import React, { useEffect, useState } from "react";

export default function Ludo() {
  const [size, setSize] = useState(0);

  useEffect(() => {
    // 2. This code ONLY runs in the browser
    const handleResize = () => {
      const h = window.innerHeight;
      const w = window.innerWidth;
      setSize(Math.min(h, w));
    };

    // Set initial size
    handleResize();

    // 3. Optional: Update size if user resizes window
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative min-h-full min-w-full">
      <div className="absolute">
        <Board size={size} />
      </div>
      <div className="absolute">
        <Token size={size} />
      </div>
    </div>
  );
}
