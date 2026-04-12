import { setupCanvas, LOOP_PATH } from "./helper";

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

export default function handleToken(ctx, canvas, size, plToken) {
  const grid = 15;
  const cell = size / grid;
  setupCanvas(canvas, ctx, size);
  
// draw tokens
  Object.entries(plToken).forEach(bases => {
    bases[1].tokens.map(t => {
    const { id, pos, initial } = t;
      let p = pos + bases[1].ext;
      if(p > 51) p = p - 52;
    if (pos === -1)
      drawToken(ctx, initial[0], initial[1], cell, bases[0]);
    else drawToken(ctx, LOOP_PATH[p].row, LOOP_PATH[p].col, cell, bases[0]);
  })
  })
}

function drawToken(ctx, row, col, cell, color) {
  const x = row * cell + cell / 2;
  const y = col * cell + cell / 2;
  const radius = cell * 0.35;
  
  // Color-specific styling
  const tokenStyles = {
    red: {
      main: "#ef4444",
      dark: "#991b1b",
      light: "#fca5a5",
      highlight: "#fee2e2",
      shadow: "rgba(185, 28, 28, 0.5)",
    },
    green: {
      main: "#22c55e",
      dark: "#166534",
      light: "#86efac",
      highlight: "#dcfce7",
      shadow: "rgba(21, 128, 61, 0.5)",
    },
    yellow: {
      main: "#eab308",
      dark: "#854d0e",
      light: "#fde047",
      highlight: "#fef9c3",
      shadow: "rgba(161, 98, 7, 0.5)",
    },
    blue: {
      main: "#3b82f6",
      dark: "#1e3a8a",
      light: "#93c5fd",
      highlight: "#dbeafe",
      shadow: "rgba(30, 64, 175, 0.5)",
    },
  };
  
  // Default style if color not found
  const style = tokenStyles[color] || {
    main: color,
    dark: color,
    light: color,
    highlight: "white",
    shadow: "rgba(0,0,0,0.3)",
  };
  
  // Drop shadow
  ctx.shadowColor = style.shadow;
  ctx.shadowBlur = 8;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  
  // Main token body with gradient
  const gradient = ctx.createRadialGradient(
    x - radius * 0.3, y - radius * 0.3, radius * 0.1,
    x, y, radius
  );
  gradient.addColorStop(0, style.light);
  gradient.addColorStop(0.5, style.main);
  gradient.addColorStop(1, style.dark);
  
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();
  
  // Remove shadow for border
  ctx.shadowColor = "transparent";
  
  // Outer border
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.strokeStyle = style.dark;
  ctx.lineWidth = cell * 0.05;
  ctx.stroke();
  
  // Inner border (decorative ring)
  ctx.beginPath();
  ctx.arc(x, y, radius * 0.8, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
  ctx.lineWidth = cell * 0.03;
  ctx.stroke();
  
  // Specular highlight (glossy effect)
  ctx.beginPath();
  ctx.arc(x - radius * 0.25, y - radius * 0.25, radius * 0.15, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.fill();
  
  // Small secondary highlight
  ctx.beginPath();
  ctx.arc(x - radius * 0.4, y - radius * 0.3, radius * 0.06, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.fill();
  
  // Token symbol (star for all tokens)
  drawStar(ctx, x + radius * 0.05, y + radius * 0.1, radius * 0.25, style.highlight);
  
  // Bottom shadow/depth ring
  ctx.beginPath();
  ctx.arc(x + radius * 0.1, y + radius * 0.1, radius * 0.85, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
  ctx.lineWidth = cell * 0.02;
  ctx.stroke();
}

// Helper function to draw a star on the token
function drawStar(ctx, cx, cy, radius, color) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.fillStyle = color;
  ctx.shadowColor = "rgba(0,0,0,0.2)";
  ctx.shadowBlur = 3;
  
  ctx.beginPath();
  const spikes = 5;
  const outerRadius = radius;
  const innerRadius = radius * 0.5;
  
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = (i * Math.PI) / spikes - Math.PI / 2;
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
  ctx.shadowColor = "transparent";
  ctx.restore();
}