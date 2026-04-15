"use client";
import useLudo from "@/store/useLudo";
import { useState } from "react";

const FACES = {
  0: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
  1: [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ],
  2: [
    [1, 0, 0],
    [0, 0, 0],
    [0, 0, 1],
  ],
  3: [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ],
  4: [
    [1, 0, 1],
    [0, 0, 0],
    [1, 0, 1],
  ],
  5: [
    [1, 0, 1],
    [0, 1, 0],
    [1, 0, 1],
  ],
  6: [
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
  ],
};

function Pips({ value }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "3px",
        width: "100%",
        height: "100%",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      {FACES[value].flat().map((cell, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {cell ? (
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #555, #111)",
                boxShadow:
                  "inset 0 1px 2px rgba(255,255,255,0.15), 0 1px 2px rgba(0,0,0,0.5)",
              }}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default function Dice() {
  const [rolling, setRolling] = useState(false);
  const [flash, setFlash] = useState(false);

  const {set, value} = useLudo()

  const rollDice = () => {
    if (rolling || value !== 0) return;
    setRolling(true);
    setFlash(false);

    setTimeout(() => {
      const result = Math.floor(Math.random() * 6) + 1;
      setRolling(false);
      setFlash(true);
      setTimeout(() => setFlash(false), 400);
      set({value: result});
    }, 600);
  };

  const spinKeyframes = `
    @keyframes diceRoll {
      0%   { transform: rotateX(0deg)   rotateY(0deg)   rotateZ(0deg)   scale(1); }
      15%  { transform: rotateX(180deg) rotateY(90deg)  rotateZ(45deg)  scale(1.15); }
      35%  { transform: rotateX(360deg) rotateY(270deg) rotateZ(90deg)  scale(1.1); }
      55%  { transform: rotateX(180deg) rotateY(540deg) rotateZ(135deg) scale(1.12); }
      75%  { transform: rotateX(540deg) rotateY(360deg) rotateZ(180deg) scale(1.08); }
      90%  { transform: rotateX(630deg) rotateY(630deg) rotateZ(225deg) scale(1.04); }
      100% { transform: rotateX(720deg) rotateY(720deg) rotateZ(270deg) scale(1); }
    }
    @keyframes landFlash {
      0%   { box-shadow: 0 0 0 0 rgba(255,220,80,0.0), 0 8px 24px rgba(0,0,0,0.45); }
      40%  { box-shadow: 0 0 0 10px rgba(255,220,80,0.35), 0 8px 24px rgba(0,0,0,0.45); }
      100% { box-shadow: 0 0 0 0 rgba(255,220,80,0.0), 0 8px 24px rgba(0,0,0,0.45); }
    }
    @keyframes shake {
      0%,100% { translate: 0 0; }
      20%     { translate: -3px 2px; }
      40%     { translate: 3px -2px; }
      60%     { translate: -2px 3px; }
      80%     { translate: 2px -1px; }
    }
  `;

  const diceStyle = {
    width: "80px",
    height: "80px",
    borderRadius: "16px",
    cursor: rolling ? "wait" : "pointer",
    userSelect: "none",
    position: "relative",
    transformStyle: "preserve-3d",
    perspective: "400px",

    background:
      "linear-gradient(145deg, #ffffff 0%, #e8e8e8 50%, #d0d0d0 100%)",
    boxShadow: flash
      ? undefined
      : "0 8px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.1)",

    border: "1px solid rgba(0,0,0,0.12)",

    animation: rolling
      ? "diceRoll 0.6s cubic-bezier(0.36,0.07,0.19,0.97) forwards, shake 0.6s ease-in-out"
      : flash
        ? "landFlash 0.4s ease-out forwards"
        : undefined,

    transition:
      rolling || flash
        ? undefined
        : "transform 0.15s ease, box-shadow 0.15s ease",
  };

  return (
    <>
      <style>{spinKeyframes}</style>
      <div>
        <div
          onClick={rollDice}
          style={diceStyle}
          onMouseEnter={(e) => {
            if (!rolling)
              e.currentTarget.style.transform = "scale(1.06) translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            if (!rolling) e.currentTarget.style.transform = "";
          }}
        >
          <Pips value={value} />

          {/* Top edge highlight */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "16px",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, transparent 45%)",
              pointerEvents: "none",
            }}
          />
          {/* Bottom edge shadow */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "16px",
              background:
                "linear-gradient(0deg, rgba(0,0,0,0.08) 0%, transparent 40%)",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </>
  );
}
