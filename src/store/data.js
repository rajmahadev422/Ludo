export const star = [];
export const PLAYER_CONFIG = {
  red: {
    color: "#E53935",
    light: "#FFCDD2",
    dark: "#B71C1C",
    token: "#FF5252",
    label: "P1",
  },
  green: {
    color: "#43A047",
    light: "#C8E6C9",
    dark: "#1B5E20",
    token: "#69F0AE",
    label: "P2",
  },
  yellow: {
    color: "#F9A825",
    light: "#FFF9C4",
    dark: "#F57F17",
    token: "#FFD740",
    label: "P3",
  },
  blue: {
    color: "#1E88E5",
    light: "#BBDEFB",
    dark: "#0D47A1",
    token: "#40C4FF",
    label: "P4",
  },
};

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

export const DOT_POSITIONS = {
  1: [[50, 50]],
  2: [
    [28, 28],
    [72, 72],
  ],
  3: [
    [28, 28],
    [50, 50],
    [72, 72],
  ],
  4: [
    [28, 28],
    [72, 28],
    [28, 72],
    [72, 72],
  ],
  5: [
    [28, 28],
    [72, 28],
    [50, 50],
    [28, 72],
    [72, 72],
  ],
  6: [
    [28, 22],
    [72, 22],
    [28, 50],
    [72, 50],
    [28, 78],
    [72, 78],
  ],
};

const cfg = PLAYER_CONFIG;

export const colorBox = [
  {
    cells: [
      [7, 1],
      [7, 2],
      [7, 3],
      [7, 4],
      [7, 5],
      [8, 1],
    ],
    fill: cfg.green.light,
    border: cfg.green.color,
  },
  {
    cells: [
      [9, 7],
      [10, 7],
      [11, 7],
      [12, 7],
      [13, 7],
      [13, 8],
    ],
    fill: cfg.blue.light,
    border: cfg.blue.color,
  },
  {
    cells: [
      [7, 9],
      [7, 10],
      [7, 11],
      [7, 12],
      [7, 13],
      [6, 13],
    ],
    fill: cfg.yellow.light,
    border: cfg.yellow.color,
  },
  {
    cells: [
      [1, 7],
      [2, 7],
      [3, 7],
      [4, 7],
      [5, 7],
      [1, 6],
    ],
    fill: cfg.red.light,
    border: cfg.red.color,
  },
];

export const path = {
  red: [
    [-1, -1],
    [1, 6],
    [2, 6],
    [3, 6],
    [4, 6],
    [5, 6],
    [6, 5],
    [6, 4],
    [6, 3],
    [6, 3],
    [6, 2],
    [6, 1],
    [6, 0],
  ],
  blue: [],
  green: [],
  yellow: [],
};

export const LOOP_PATH = [
  { col: 6, row: 1 }, { col: 6, row: 2 }, { col: 6, row: 3 }, { col: 6, row: 4 }, { col: 6, row: 5 },
  { col: 5, row: 6 }, { col: 4, row: 6 }, { col: 3, row: 6 }, { col: 2, row: 6 }, { col: 1, row: 6 },
  { col: 0, row: 6 }, { col: 0, row: 7 }, { col: 0, row: 8 },
  { col: 1, row: 8 }, { col: 2, row: 8 }, { col: 3, row: 8 }, { col: 4, row: 8 }, { col: 5, row: 8 },
  { col: 6, row: 9 }, { col: 6, row: 10 }, { col: 6, row: 11 }, { col: 6, row: 12 }, { col: 6, row: 13 }, { col: 6, row: 14 },

  { col: 7, row: 14 }, { col: 8, row: 14 },
  { col: 8, row: 13 }, { col: 8, row: 12 }, { col: 8, row: 11 }, { col: 8, row: 10 }, { col: 8, row: 9 },
  { col: 9, row: 8 }, { col: 10, row: 8 }, { col: 11, row: 8 }, { col: 12, row: 8 }, { col: 13, row: 8 }, { col: 14, row: 8 },
  { col: 14, row: 7 }, { col: 14, row: 6 },
  { col: 13, row: 6 }, { col: 12, row: 6 }, { col: 11, row: 6 }, { col: 10, row: 6 }, { col: 9, row: 6 },
  { col: 8, row: 5 }, { col: 8, row: 4 }, { col: 8, row: 3 }, { col: 8, row: 2 }, { col: 8, row: 1 }, { col: 8, row: 0 },

  { col: 7, row: 0 }, { col: 6, row: 0 }
];