"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function GameLobby() {
  const params = useParams();
  const router = useRouter();
  const gameCode = params.code;

  const [game, setGame] = useState(null);
  const [players, setPlayers] = useState([]);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Color mapping
  const colorMap = {
    red: { bg: "bg-red-500", border: "border-red-400", text: "text-red-300" },
    green: {
      bg: "bg-green-500",
      border: "border-green-400",
      text: "text-green-300",
    },
    yellow: {
      bg: "bg-yellow-500",
      border: "border-yellow-400",
      text: "text-yellow-300",
    },
    blue: {
      bg: "bg-blue-500",
      border: "border-blue-400",
      text: "text-blue-300",
    },
  };

  useEffect(() => {
    // Load game data
    const loadGame = () => {
      const gameData = localStorage.getItem(`game_${gameCode}`);
      if (gameData) {
        const parsed = JSON.parse(gameData);
        setGame(parsed);
        setPlayers(parsed.players);
      }
      setIsLoading(false);
    };

    loadGame();

    // Poll for updates (in production, use WebSockets)
    const interval = setInterval(loadGame, 3000);
    return () => clearInterval(interval);
  }, [gameCode]);

  const copyGameCode = () => {
    navigator.clipboard.writeText(gameCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const startGame = () => {
    if (game) {
      const updatedGame = { ...game, status: "playing" };
      localStorage.setItem(`game_${gameCode}`, JSON.stringify(updatedGame));
      router.push(`/online/play/${gameCode}`);
    }
  };

  const isHost = game?.players?.some((p) => p.isHost && p.name === game.host);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin text-4xl mb-4">🎲</div>
          <p>Loading game lobby...</p>
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">Game not found</p>
          <button
            onClick={() => router.push("/online")}
            className="px-6 py-2 bg-purple-500 text-white rounded-lg"
          >
            Back to Online
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.push("/online")}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-white">Game Lobby</h1>
          <div className="w-20" />
        </div>

        {/* Game Code Display */}
        <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 mb-8 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-2">Game Code</p>
              <p className="text-5xl font-mono font-bold text-white tracking-wider">
                {gameCode}
              </p>
            </div>
            <button
              onClick={copyGameCode}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              {copied ? (
                <span className="text-green-400">✓ Copied!</span>
              ) : (
                <span className="text-white">📋 Copy</span>
              )}
            </button>
          </div>
          <p className="text-gray-400 text-sm mt-4">
            Share this code with friends to invite them
          </p>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {["red", "green", "yellow", "blue"].map((color) => {
            const player = players.find((p) => p.color === color);
            const colorStyle = colorMap[color];

            return (
              <div
                key={color}
                className={`p-4 rounded-xl border-2 ${
                  player
                    ? `${colorStyle.border} bg-gray-800/50`
                    : "border-gray-700 bg-gray-800/30"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${colorStyle.bg}`} />
                  <span className={`capitalize ${colorStyle.text}`}>
                    {color}
                  </span>
                </div>
                {player ? (
                  <div>
                    <p className="text-white font-semibold truncate">
                      {player.name}
                      {player.isHost && (
                        <span className="ml-2 text-xs bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded">
                          Host
                        </span>
                      )}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">Ready ✓</p>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Waiting for player...</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center">
          {isHost ? (
            <button
              onClick={startGame}
              disabled={players.length < 2}
              className={`px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transform hover:scale-105 active:scale-95 transition-all ${
                players.length >= 2
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
            >
              {players.length >= 2
                ? "Start Game →"
                : `Waiting for players (${players.length}/4)`}
            </button>
          ) : (
            <div className="text-center">
              <div className="animate-pulse mb-2">
                <div className="w-8 h-8 mx-auto border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
              </div>
              <p className="text-gray-400">
                Waiting for host to start the game...
              </p>
            </div>
          )}
        </div>

        {/* Player list for mobile */}
        <div className="mt-8 md:hidden">
          <h3 className="text-white font-semibold mb-2">
            Players ({players.length}/4)
          </h3>
          <div className="space-y-2">
            {players.map((player) => (
              <div
                key={player.name}
                className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg"
              >
                <div
                  className={`w-3 h-3 rounded-full bg-${player.color}-500`}
                />
                <span className="text-white">{player.name}</span>
                {player.isHost && (
                  <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded">
                    Host
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
