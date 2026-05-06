"use client";

import CreateRoom from "@/components/ludo/CreateRoom";
import JoinRoom from "@/components/ludo/JoinRoom";
import { useState } from "react";

export default function RoomPage() {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white text-gray-900 w-full max-w-md p-6 rounded-2xl shadow-lg">
        {/* Tabs */}
        <div className="flex mb-6 border-b">
          <button
            onClick={() => setActiveTab("create")}
            className={`flex-1 py-2 text-sm ${
              activeTab === "create"
                ? "border-b-2 border-blue-500 font-semibold text-blue-600"
                : "text-gray-500"
            }`}
          >
            Create Room
          </button>

          <button
            onClick={() => setActiveTab("join")}
            className={`flex-1 py-2 text-sm ${
              activeTab === "join"
                ? "border-b-2 border-green-500 font-semibold text-green-600"
                : "text-gray-500"
            }`}
          >
            Join Room
          </button>
        </div>

        {/* CREATE ROOM */}
        {activeTab === "create" && <CreateRoom />}

        {/* JOIN ROOM */}
        {activeTab === "join" && <JoinRoom />}
      </div>
    </div>
  );
}
