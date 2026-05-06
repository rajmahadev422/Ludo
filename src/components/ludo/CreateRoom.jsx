"use client";
import { useCreateRoom } from "@/store/useOnlineLudo";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { connectWS } from "@/utils/socket";

export default function CreateRoom() {
  const [createData, setCreateData] = useState({
    title: "",
    players: 2,
    name: "",
  });

  const router = useRouter();

  const sot = useRef(null);

  useEffect(() => {
    sot.current = connectWS();
    console.log("socket connected");

    sot.current.on("connect", () => {
      sot.current.on("roomCreated", ({ roomId }) => {
        console.log("Room created with ID:", roomId);
        router.push(`/room/${roomId}`);
      });
    });
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!createData.title.trim()) {
      createData.title = "Ludo Game";
    }

    sot.current.emit("createRoom", createData);
  };
  return (
    <form onSubmit={handleCreate} className="space-y-4">
      <div>
        <label className="text-sm text-gray-600">Your Name*</label>
        <input
          type="text"
          value={createData.name}
          onChange={(e) =>
            setCreateData({ ...createData, name: e.target.value })
          }
          placeholder="Enter Your name"
          className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="text-sm text-gray-600">Number of Players (2–4)</label>
        <input
          type="number"
          min="2"
          max="4"
          value={createData.players}
          onChange={(e) =>
            setCreateData({
              ...createData,
              players: Math.min(4, Math.max(2, Number(e.target.value))),
            })
          }
          className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="text-sm text-gray-600">Game Title</label>
        <input
          type="text"
          value={createData.title}
          onChange={(e) =>
            setCreateData({ ...createData, title: e.target.value })
          }
          placeholder="Enter game title"
          className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
        Create Room
      </button>
    </form>
  );
}
