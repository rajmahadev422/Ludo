"use client";

import { connectWS } from "@/utils/socket";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Room() {
  const { roomId } = useParams();
  const [gameState, setGameState] = useState(null);
  const [notice, setNotice] = useState("");

  const sot = useRef(null);

  useEffect(() => {
    sot.current = connectWS();

    sot.current.on("connect", async () => {
      await sot.current.emit("roomStatus", roomId);
      await sot.current.on("playerList", (playerList) => {
        console.log("socket connected to room component page-2");

        console.log("Current players in room:", playerList);
        setGameState(playerList);
      });
    });
    sot.current.on("joinNotice", (userName) => {
      setNotice(`User ${userName} joined the room!`);
      console.log(`User ${userName} joined the room!`);
      setTimeout(() => {
        setNotice("");
      }, 3000);
    });
    sot.current.on("error_message", (data) => {
      setNotice(data);

      setTimeout(() => {
        setNotice("");
      }, 5000);
    });

    return () => {
      sot.current.off("roomStatus");
      sot.current.off("joinedNotice");
    };
  }, [roomId]);

  return (
    <div className="relative p-6">
      {/* Notice */}
      {notice && (
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg absolute top-2 right-2">
          {notice}
        </div>
      )}

      <h1 className="text-2xl font-bold mb-2">
        Room: {gameState?.title || "Title"}
      </h1>

      <p className="mb-1">Room Id: {roomId}</p>
      <p className="mb-4">
        Players: {gameState?.players?.length || 0} /{" "}
        {gameState?.maxPlayers || 0}
      </p>

      {/* Slots */}
      <div className="grid grid-cols-2 gap-4 max-w-md">
        {Array.from({ length: gameState?.maxPlayers || 0 }).map((_, index) => {
          const player = gameState?.players?.[index];

          return (
            <div
              key={index}
              className={`p-4 rounded-xl border text-center font-medium ${
                player
                  ? "bg-green-200 border-green-500"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              {player ? (
                <>
                  <p className="text-lg">{player.name}</p>
                  <p className="text-sm text-green-700">Joined</p>
                </>
              ) : (
                <>
                  <p className="text-lg text-gray-500">Waiting...</p>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
