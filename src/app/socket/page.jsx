"use client";
import { useEffect, useRef } from "react";
import { socket, connectWS } from "@/utils/socket";

export default function WatingRoom() {
  const sot = useRef(null);

  useEffect(() => {
    sot.current = connectWS();
    console.log("socket connected");

    sot.current.on("connect", () => {

      sot.current.emit("joinRoom", "room1", "John Doe");
    })
  }, []);

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Join Room</h2>
      <p className="text-gray-600">This feature is coming soon!</p>
    </div>
  );
}