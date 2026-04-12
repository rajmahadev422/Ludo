import { LOOP_PATH } from "./data";
import { setupCanvas } from "./helper";
const plToken = {
  red: {
    name: "p-1",
    ext: 0,
    tokens: [
      { id: 1, pos: -1, initial: [1.5, 1.5] },
      { id: 2, pos: 39, initial: [3.5, 1.5] },
      { id: 3, pos: -1, initial: [1.5, 3.5] },
      { id: 4, pos: -1, initial: [3.5, 3.5] },
    ],
  },
  green: {
    name: "p-2",
    ext: 13,
    tokens: [
      { id: 1, pos: -1, initial: [10.5, 1.5] },
      { id: 2, pos: 39, initial: [12.5, 1.5] },
      { id: 3, pos: -1, initial: [10.5, 3.5] },
      { id: 4, pos: -1, initial: [12.5, 3.5] },
    ],
  },
  blue: {
    name: "p-3",
    ext: 26,
    tokens: [
      { id: 1, pos: -1, initial: [10.5, 10.5] },
      { id: 2, pos: 39, initial: [12.5, 10.5] },
      { id: 3, pos: -1, initial: [10.5, 12.5] },
      { id: 4, pos: -1, initial: [12.5, 12.5] },
    ],
  },
  yellow: {
    name: "p-4",
    ext: 39,
    tokens: [
      { id: 1, pos: -1, initial: [3.5, 10.5] },
      { id: 2, pos: -1, initial: [3.5, 12.5] },
      { id: 3, pos: -1, initial: [1.5, 10.5] },
      { id: 4, pos: 39, initial: [1.5, 12.5] },
    ],
  },
};

const BASES = {
  red: { col: 9, row: 0, base: "#c0392b", light: "#f8d7d4", dark: "#7b241c" },
  green: { col: 9, row: 9, base: "#27ae60", light: "#d5f0dc", dark: "#1a7040" },
  yellow: {
    col: 0,
    row: 0,
    base: "#d4a017",
    light: "#fef9d9",
    dark: "#8a6800",
  },
  blue: { col: 0, row: 9, base: "#2471a3", light: "#d0e9f8", dark: "#154060" },
};

export default function handleToken(ctx, canvas, size) {
  const grid = 15;
  const cell = size / grid;
  setupCanvas(canvas, ctx, size);

// draw tokens
  Object.entries(plToken).forEach(bases => {
    bases[1].tokens.map(t => {
    const { id, pos, initial } = t;
      let p = pos + bases[1].ext;
      if(p > 51) p = p - 50;
    if (pos === -1)
      drawToken(ctx, initial[0], initial[1], cell, BASES[bases[0]].dark);
    else drawToken(ctx, LOOP_PATH[p].row, LOOP_PATH[p].col, cell, BASES[bases[0]].dark);
  })
  })
}

function drawToken(ctx, row, col, cell, color) {
  const x = row * cell + cell / 2;
  const y = col * cell + cell / 2;

  ctx.beginPath();
  ctx.arc(x, y, 0.35 * cell, 0, Math.PI * 2);

  ctx.fillStyle = color;
  ctx.fill();

  ctx.lineWidth = 3;
  ctx.strokeStyle = "black";
  ctx.stroke();
}
