"use client";

import handleToken from "@/store/useToken";

import React, { useEffect } from "react";
import { useRef } from "react";

const Token = ({ size }) => {
  const tokenRef = useRef(null);

useEffect(() => {
  const canvas = tokenRef.current;
  const ctx = canvas.getContext('2d');
  handleToken(ctx, canvas, size);

}, [size]);

  return <canvas ref={tokenRef} className="block z-20 border-2 p-1" />;
};

export default Token;
