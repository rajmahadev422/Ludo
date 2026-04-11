import { setupCanvas } from "./helper";

export default function handleToken(ctx, canvas, size) {
  const grid = 15;
  const cell = size / grid;
  setupCanvas(canvas, ctx, size);
  // drawOutline(ctx, cell, size, grid);
}