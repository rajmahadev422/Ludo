"use client";

import useLudo from "@/store/useLudo";
import handleToken from "@/store/useToken";

import React, { useEffect, useState } from "react";
import { useRef } from "react";

const Token = ({ size }) => {
  const tokenRef = useRef(null);

  const { initializeToken, playersData, handleClick } = useLudo();
  const [pl, setPl] = useState(playersData);

  useEffect(() => {
    initializeToken();
  }, [0]);

  useEffect(() => {
    const canvas = tokenRef.current;
    const ctx = canvas.getContext("2d");
    if (playersData) handleToken(ctx, canvas, size, playersData);
    console.log(playersData);
  }, [size, playersData]);

  return (
    <canvas
      onPointerDown={(e) => handleClick(e, tokenRef, size)}
      ref={tokenRef}
      className="block z-20 border-2 p-1"
    />
  );
};

export default Token;
