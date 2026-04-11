"use client";

import drawBoard from "@/store/useBoard";

import React, { useEffect } from "react";
import { useRef } from "react";

const Token = ({ size }) => {
  const tokenRef = useRef(null);

useEffect(() => {
  const canvas = tokenRef.current;
  const ctx = canvas.getContext('2d');

}, [size]);

  return <canvas ref={tokenRef} className="block" />;
};

export default Token;
