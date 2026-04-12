export function setupCanvas(canvas, ctx, size) {
  const dpr = window.devicePixelRatio || 1;

  canvas.width = size * dpr;
  canvas.height = size * dpr;

  canvas.style.width = size + "px";
  canvas.style.height = size + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

export const starCells = [
  [1, 6],
  [6, 2],
  [8, 1],
  [12, 6],
  [6, 13],
  [2, 8],
  [8, 12],
  [13, 8],
];

export const LOOP_PATH = [
  { col: 6, row: 1 },
  { col: 6, row: 2 },
  { col: 6, row: 3 },
  { col: 6, row: 4 },
  { col: 6, row: 5 },
  { col: 5, row: 6 },
  { col: 4, row: 6 },
  { col: 3, row: 6 },
  { col: 2, row: 6 },
  { col: 1, row: 6 },
  { col: 0, row: 6 },
  { col: 0, row: 7 },
  { col: 0, row: 8 },
  { col: 1, row: 8 },
  { col: 2, row: 8 },
  { col: 3, row: 8 },
  { col: 4, row: 8 },
  { col: 5, row: 8 },
  { col: 6, row: 9 },
  { col: 6, row: 10 },
  { col: 6, row: 11 },
  { col: 6, row: 12 },
  { col: 6, row: 13 },
  { col: 6, row: 14 },

  { col: 7, row: 14 },
  { col: 8, row: 14 },
  { col: 8, row: 13 },
  { col: 8, row: 12 },
  { col: 8, row: 11 },
  { col: 8, row: 10 },
  { col: 8, row: 9 },
  { col: 9, row: 8 },
  { col: 10, row: 8 },
  { col: 11, row: 8 },
  { col: 12, row: 8 },
  { col: 13, row: 8 },
  { col: 14, row: 8 },
  { col: 14, row: 7 },
  { col: 14, row: 6 },
  { col: 13, row: 6 },
  { col: 12, row: 6 },
  { col: 11, row: 6 },
  { col: 10, row: 6 },
  { col: 9, row: 6 },
  { col: 8, row: 5 },
  { col: 8, row: 4 },
  { col: 8, row: 3 },
  { col: 8, row: 2 },
  { col: 8, row: 1 },
  { col: 8, row: 0 },

  { col: 7, row: 0 },
  { col: 6, row: 0 },
];

export const plToken = {
  red: {
    name: "p-1",
    ext: 0,
    tokens: [
      { id: 1, pos: -1, initial: [1.5, 1.5] },
      { id: 2, pos: -1, initial: [3.5, 1.5] },
      { id: 3, pos: -1, initial: [1.5, 3.5] },
      { id: 4, pos: -1, initial: [3.5, 3.5] },
    ],
  },
  green: {
    name: "p-2",
    ext: 13,
    tokens: [
      { id: 1, pos: -1, initial: [10.5, 1.5] },
      { id: 2, pos: -1, initial: [12.5, 1.5] },
      { id: 3, pos: -1, initial: [10.5, 3.5] },
      { id: 4, pos: -1, initial: [12.5, 3.5] },
    ],
  },
  blue: {
    name: "p-3",
    ext: 26,
    tokens: [
      { id: 1, pos: -1, initial: [10.5, 10.5] },
      { id: 2, pos: -1, initial: [12.5, 10.5] },
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
      { id: 4, pos: -1, initial: [1.5, 12.5] },
    ],
  },
};
