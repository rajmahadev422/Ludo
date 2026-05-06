import { connectWS } from "@/utils/socket";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function JoinRoom() {
  const [joinData, setJoinData] = useState({
    name: "",
    code: "",
  });

  const [notice, setNotice] = useState("");
  const router = useRouter();

  const sot = useRef(null);

  useEffect(() => {
    sot.current = connectWS();
    console.log("socket connected");

    sot.current.on("joinSuccess", ({ roomId }) => {
      console.log("Joined room with ID:", roomId);
      router.push(`/room/${roomId}`);
    })
    sot.current.on("error_message", (data) => {
      setNotice(data);
      setJoinData((prev) => ({ ...prev, code: "" }));

      setTimeout(() => {
        setNotice("");
      }, 5000);
    });
  }, []);

  const handleJoin = async (e) => {
    e.preventDefault();

    await sot.current.emit("joinRoom", joinData.code, joinData.name);

  };
  return (
    <form onSubmit={handleJoin} className="space-y-4 relative">
      <div className="absolute bg-white top-0 right-0">
        {notice && (
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg">
            {notice}
          </div>
        )}
      </div>

      <div>
        <label className="text-sm text-gray-600">Your Name</label>
        <input
          type="text"
          value={joinData.name}
          required
          onChange={(e) => setJoinData({ ...joinData, name: e.target.value })}
          placeholder="Enter your name"
          className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div>
        <label className="text-sm text-gray-600">Room Code</label>
        <input
          type="text"
          value={joinData.code.toUpperCase()}
          maxLength={6}
          required
          onChange={(e) => setJoinData({ ...joinData, code: e.target.value })}
          placeholder="Enter room code"
          className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <button
        href={`/room/${joinData.code}`}
        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
      >
        Join Room
      </button>
    </form>
  );
}
