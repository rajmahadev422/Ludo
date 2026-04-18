"use client";

import useLudo from "@/store/useLudo";
import handleToken from "@/store/useToken";

import React, { useEffect, useState } from "react";
import { useRef } from "react";

const Token = ({ size }) => {
  const tokenRef = useRef(null);

  const { playersData, handleClick, value, choice, players } = useLudo();

  useEffect(() => {
    const canvas = tokenRef.current;
    const ctx = canvas.getContext("2d");
    if (playersData) {
      const base = players[choice % 4];
      handleToken(ctx, canvas, size, playersData, base);
    };
    localStorage.setItem('playersData', JSON.stringify(playersData));
  }, [size, playersData, value]);

  function addText(ctx, text, x, y) {
    const cell = size/15;

    const row = x*cell;
    const col = y*cell;
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(text, row, col);
  }
  return (
    <canvas
      onPointerDown={(e) => handleClick(e, tokenRef, size)}
      ref={tokenRef}
      className="block z-20 border"
    />
  );
};

export default Token;
