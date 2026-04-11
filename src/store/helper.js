export function setupCanvas(canvas, ctx, size) {
  const dpr = window.devicePixelRatio || 1;

  canvas.width = size * dpr;
  canvas.height = size * dpr;

  canvas.style.width = size + "px";
  canvas.style.height = size + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}