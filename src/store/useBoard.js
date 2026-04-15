// boardRenderer.js

import { boardData, setupCanvas, starCells } from "./helper";

function drawOutline(ctx, cell, size, grid) {
  // Premium background with subtle gradient
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, "#f8f9fa");
  gradient.addColorStop(0.5, "#e9ecef");
  gradient.addColorStop(1, "#f8f9fa");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  // Draw elegant grid lines
  ctx.lineWidth = 1.5;

  for (let i = 0; i <= grid; i++) {
    // Thicker lines for main paths
    if (i === 6 || i === 7 || i === 8 || i === 9) {
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = "#adb5bd";
    } else {
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "#dee2e6";
    }

    ctx.beginPath();
    ctx.moveTo(i * cell, 0);
    ctx.lineTo(i * cell, size);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i * cell);
    ctx.lineTo(size, i * cell);
    ctx.stroke();
  }

  // Draw subtle grid dots at intersections
  ctx.fillStyle = "#ced4da";
  for (let i = 0; i <= grid; i++) {
    for (let j = 0; j <= grid; j++) {
      ctx.beginPath();
      ctx.arc(i * cell, j * cell, cell * 0.03, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
}

const PLAYER_BASES = {
  red: {
    start: [0, 0],
    color: "#ef4444",
    fill: "#fee2e2",
    border: "#dc2626",
    light: "#fca5a5",
    dark: "#991b1b",
    gradient: ["#ef4444", "#dc2626"],
  },
  green: {
    start: [9, 0],
    color: "#22c55e",
    fill: "#dcfce7",
    border: "#16a34a",
    light: "#86efac",
    dark: "#166534",
    gradient: ["#22c55e", "#16a34a"],
  },
  yellow: {
    start: [0, 9],
    color: "#eab308",
    fill: "#fef9c3",
    border: "#ca8a04",
    light: "#fde047",
    dark: "#854d0e",
    gradient: ["#eab308", "#ca8a04"],
  },
  blue: {
    start: [9, 9],
    color: "#3b82f6",
    fill: "#dbeafe",
    border: "#2563eb",
    light: "#93c5fd",
    dark: "#1e3a8a",
    gradient: ["#3b82f6", "#2563eb"],
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

export default function drawBoard(ctx, canvas, size) {
  const grid = 15;
  const cell = size / grid;

  setupCanvas(canvas, ctx, size);
  drawOutline(ctx, cell, size, grid);

  const theme = getTheme();
  drawCenter(ctx, cell, theme);
  // Draw player bases with gradients and shadows
  Object.entries(boardData).forEach(([player, base]) => {
    const [x, y] = base.origin;

    // Main base with gradient
    drawGradientRect(ctx, x, y, 6, 6, cell, base.gradient[0], base.gradient[1]);

    // Inner white area with soft shadow
    ctx.shadowColor = "rgba(0,0,0,0.1)";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    drawCells(ctx, x + 1, y + 1, 4, 4, cell, "#ffffff");
    ctx.shadowColor = "transparent";

    // Player home circles (pawn positions)
    [[1,1],[3,1],[1,3],[3,3]].forEach(([row,col]) => drawStyledCircle(ctx, x + row, y + col, cell, base.color, base.border));

    [0, 51, 52, 53, 54, 55].forEach((p) => drawBoundary(ctx, base.path[p][1], base.path[p][0], cell, base.fill, base.border, 1.5))
    // Decorative corner accents
    drawCornerAccent(ctx, x, y, cell, base.light);
  });
  // styleHomeCell(ctx, cell);
  // Draw star cells with enhanced styling
  drawStars(ctx, cell);
}

function drawGradientRect(ctx, row, col, w, h, cell, color1, color2) {
  const x = row * cell;
  const y = col * cell;
  const width = w * cell;
  const height = h * cell;

  const gradient = ctx.createLinearGradient(x, y, x + width, y + height);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);

  ctx.fillStyle = gradient;
  ctx.fillRect(x, y, width, height);

  // Add subtle inner border
  ctx.strokeStyle = "rgba(255,255,255,0.2)";
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 1, y + 1, width - 2, height - 2);
}

function drawCells(ctx, row, col, w, h, cell, color) {
  const x = row * cell;
  const y = col * cell;
  const width = w * cell;
  const height = h * cell;

  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function drawStyledCircle(ctx, row, col, cell, fillColor, borderColor) {
  const cx = row * cell + cell / 2;
  const cy = col * cell + cell / 2;
  // Shadow effect
  ctx.shadowColor = "rgba(0,0,0,0.2)";
  ctx.shadowBlur = 6;
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 1;

  // Outer circle
  ctx.beginPath();
  ctx.fillStyle = borderColor;
  ctx.fillRect(cx, cy, cell, cell);
  ctx.fill();
}

function drawCornerAccent(ctx, row, col, cell, color) {
  const x = row * cell;
  const y = col * cell;

  ctx.fillStyle = color;
  ctx.globalAlpha = 0.3;

  // Small decorative squares in corners
  ctx.fillRect(x + 2, y + 2, cell * 0.5, cell * 0.5);
  ctx.fillRect(x + cell * 5.5, y + 2, cell * 0.5, cell * 0.5);
  ctx.fillRect(x + 2, y + cell * 5.5, cell * 0.5, cell * 0.5);
  ctx.fillRect(x + cell * 5.5, y + cell * 5.5, cell * 0.5, cell * 0.5);

  ctx.globalAlpha = 1.0;
}

function drawStars(ctx, cell) {
  starCells.forEach(([col, row]) => {
    const cx = col * cell + cell / 2;
    const cy = row * cell + cell / 2;
    const r = cell * 0.35;

    ctx.save();
    ctx.translate(cx, cy);

    // Glow effect
    ctx.shadowColor = "#fbbf24";
    ctx.shadowBlur = 12;

    // Star gradient
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
    gradient.addColorStop(0, "#fef08a");
    gradient.addColorStop(1, "#f59e0b");

    ctx.fillStyle = gradient;
    ctx.beginPath();

    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.closePath();
    ctx.fill();

    // Star outline
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "#d97706";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Inner sparkle
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.15, 0, 2 * Math.PI);
    ctx.fillStyle = "#fef3c7";
    ctx.fill();

    ctx.restore();
  });
}

function getTheme() {
  const isDark =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  return {
    isDark,
    boardBg: isDark ? "#1a1610" : "#f9f6ef",
    cellEven: isDark ? "#22201a" : "#fdfaf3",
    cellOdd: isDark ? "#201e18" : "#f3eee2",
    gridLine: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)",
    gold: "#c8993a",
    goldLight: "#e8c46a",
    gridBorder: isDark ? "rgba(180,140,60,0.35)" : "rgba(140,100,30,0.3)",
    starFill: "rgba(210,160,30,0.85)",
    centerBg: isDark ? "#1a1810" : "#f0ead8",
  };
}

// center design

function drawCenter(ctx, cell, theme) {
  // Background
  ctx.fillStyle = theme.centerBg;
  ctx.fillRect(6 * cell, 6 * cell, 3 * cell, 3 * cell);

  // Gold frame
  ctx.strokeStyle = theme.gold;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(6 * cell + 1, 6 * cell + 1, 3 * cell - 2, 3 * cell - 2);

  const cx = 7.5 * cell;
  const cy = 7.5 * cell;

  // 4 colored triangles
  [
    {
      color: BASES.red.base,
      pts: [
        [6, 6],
        [9, 6],
        [7.5, 7.5],
      ],
    },
    {
      color: BASES.green.base,
      pts: [
        [9, 6],
        [9, 9],
        [7.5, 7.5],
      ],
    },
    {
      color: BASES.blue.base,
      pts: [
        [9, 9],
        [6, 9],
        [7.5, 7.5],
      ],
    },
    {
      color: BASES.yellow.base,
      pts: [
        [6, 9],
        [6, 6],
        [7.5, 7.5],
      ],
    },
  ].forEach(({ color, pts }) => {
    ctx.beginPath();
    ctx.moveTo(pts[0][0] * cell, pts[0][1] * cell);
    ctx.lineTo(pts[1][0] * cell, pts[1][1] * cell);
    ctx.lineTo(pts[2][0] * cell, pts[2][1] * cell);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.82;
    ctx.fill();
    ctx.globalAlpha = 1;
  });

  // 8-point gold star
  const r1 = cell * 0.52;
  const r2 = cell * 0.22;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.fillStyle = theme.gold;
  ctx.globalAlpha = 0.9;
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const a1 = (i * 2 * Math.PI) / 8 - Math.PI / 2;
    const a2 = ((i + 0.5) * 2 * Math.PI) / 8 - Math.PI / 2;
    i === 0
      ? ctx.moveTo(Math.cos(a1) * r1, Math.sin(a1) * r1)
      : ctx.lineTo(Math.cos(a1) * r1, Math.sin(a1) * r1);
    ctx.lineTo(Math.cos(a2) * r2, Math.sin(a2) * r2);
  }
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;

  // Center circle
  ctx.beginPath();
  ctx.arc(0, 0, cell * 0.18, 0, Math.PI * 2);
  ctx.fillStyle = theme.centerBg;
  ctx.fill();
  ctx.strokeStyle = theme.gold;
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();
}

function styleHomeCell(ctx, cell) {
  // red
  drawBoundary(
    ctx,
    1,
    6,
    cell,
    PLAYER_BASES["red"].fill,
    PLAYER_BASES["red"].border,
    1.5,
  );
  for (let i = 1; i < 6; i++)
    drawBoundary(
      ctx,
      i,
      7,
      cell,
      PLAYER_BASES["red"].fill,
      PLAYER_BASES["red"].border,
      1.5,
    );
  drawBoundary(
    ctx,
    6,
    2,
    cell,
    PLAYER_BASES["red"].fill,
    PLAYER_BASES["red"].border,
    1.5,
  );
  // green
  drawBoundary(
    ctx,
    8,
    1,
    cell,
    PLAYER_BASES["green"].fill,
    PLAYER_BASES["green"].border,
    1.5,
  );
  for (let i = 1; i < 6; i++)
    drawBoundary(
      ctx,
      7,
      i,
      cell,
      PLAYER_BASES["green"].fill,
      PLAYER_BASES["green"].border,
      1.5,
    );
  drawBoundary(
    ctx,
    12,
    6,
    cell,
    PLAYER_BASES["green"].fill,
    PLAYER_BASES["green"].border,
    1.5,
  );

  // blue
  drawBoundary(
    ctx,
    13,
    8,
    cell,
    PLAYER_BASES["blue"].fill,
    PLAYER_BASES["blue"].border,
    1.5,
  );
  for (let i = 9; i < 14; i++)
    drawBoundary(
      ctx,
      i,
      7,
      cell,
      PLAYER_BASES["blue"].fill,
      PLAYER_BASES["blue"].border,
      1.5,
    );
  drawBoundary(
    ctx,
    8,
    12,
    cell,
    PLAYER_BASES["blue"].fill,
    PLAYER_BASES["blue"].border,
    1.5,
  );

  // yellow
  drawBoundary(
    ctx,
    6,
    13,
    cell,
    PLAYER_BASES["yellow"].fill,
    PLAYER_BASES["yellow"].border,
    1.5,
  );
  for (let i = 9; i < 14; i++)
    drawBoundary(
      ctx,
      7,
      i,
      cell,
      PLAYER_BASES["yellow"].fill,
      PLAYER_BASES["yellow"].border,
      1.5,
    );
  drawBoundary(
    ctx,
    2,
    8,
    cell,
    PLAYER_BASES["yellow"].fill,
    PLAYER_BASES["yellow"].border,
    1.5,
  );
}

function drawBoundary(ctx, x, y, c, fill, border, p = 0) {
  const row = x * c + p;
  const col = y * c + p;
  const cell = c - 2 * p;
  // 1. Set the styles
  ctx.fillStyle = fill; // Interior color (Green)
  ctx.strokeStyle = border; // Boundary color (Black)
  ctx.lineWidth = 1; // Thickness of the boundary

  // 2. Draw the filled interior
  // fillRect(x, y, width, height)
  ctx.fillRect(row, col, cell, cell);

  // 3. Draw the boundary
  // strokeRect(x, y, width, height)
  ctx.strokeRect(row, col, cell, cell);
}
