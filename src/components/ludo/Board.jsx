"use client";

import drawBoard from "@/store/useBoard";

import React, { useEffect } from "react";
import { useRef } from "react";

const Board = ({ size }) => {
  const boardRef = useRef(null);

  useEffect(() => {
  if(!size || size === 0) return;

  const canvas = boardRef.current;
  const ctx = canvas?.getContext("2d");
  drawBoard(ctx, canvas, size);
  }, [size]);


  return (
      <canvas
        ref={boardRef}
        className="block"
      />
  );
};

export default Board;
