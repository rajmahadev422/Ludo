"use client";

import { useEffect } from "react";
import { socket } from "@/utils/socket";

export default function SocketProvider({ children }) {
  
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  return children;
}