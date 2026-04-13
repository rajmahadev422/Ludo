"use client";

import { useState, useEffect } from "react";

export default function LocalPage() {
  const [playerCount, setPlayerCount] = useState(2);
  const [players, setPlayers] = useState([]);
  const [gameName, setGameName] = useState("game-1");

  // Generate default players
  useEffect(() => {
    const defaultPlayers = Array.from({ length: playerCount }, (_, i) => ({
      name: `p-${i + 1}`,
    }));
    setPlayers(defaultPlayers);
  }, [playerCount]);

  const handlePlayerChange = (index, value) => {
    const updated = [...players];
    updated[index].name = value;
    setPlayers(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      gameName,
      playerCount,
      players,
    };

    console.log("FORM DATA:", data);

    window.location.href = "/local/game";
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-2xl w-95 shadow-xl"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Game Setup</h1>

        {/* Game Name */}
        <div className="mb-4">
          <label className="text-sm text-gray-300">Game Name</label>
          <input
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            className="w-full mt-1 p-2 rounded bg-gray-700 outline-none"
          />
        </div>

        {/* Radio Buttons */}
        <div className="mb-4">
          <p className="text-sm text-gray-300 mb-2">Select Players</p>

          <div className="flex justify-between">
            {[2, 3, 4].map((num) => (
              <label
                key={num}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer border
                  ${
                    playerCount === num
                      ? "bg-blue-600 border-blue-400"
                      : "bg-gray-700 border-gray-600"
                  }`}
              >
                <input
                  type="radio"
                  name="players"
                  value={num}
                  checked={playerCount === num}
                  onChange={() => setPlayerCount(num)}
                  className="accent-blue-500"
                />
                {num}P
              </label>
            ))}
          </div>
        </div>

        {/* Player Inputs */}
        <div className="flex flex-col gap-3 mb-4">
          {players.map((p, i) => (
            <input
              key={i}
              value={p.name}
              onChange={(e) => handlePlayerChange(i, e.target.value)}
              className="p-2 rounded bg-gray-700 outline-none"
              placeholder={`Player ${i + 1}`}
            />
          ))}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 cursor-pointer bg-green-500 hover:bg-green-600 rounded-xl font-semibold"
        >
          Start Game
        </button>
      </form>
    </div>
  );
}
