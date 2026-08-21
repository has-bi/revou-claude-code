export type SwipeIntent = "next" | "prev" | null;

/** Minimum horizontal travel (px) before a touch counts as a swipe. */
export const SWIPE_THRESHOLD = 50;

/**
 * Decide what a finished touch gesture meant.
 *
 * Kept pure and separate from the component so the rules are testable:
 *   - travel shorter than the threshold is a tap, not a swipe
 *   - a gesture that moved further vertically than horizontally is a scroll,
 *     so reading a long slide never flips the deck out from under you
 */
export function resolveSwipe(dx: number, dy: number, threshold = SWIPE_THRESHOLD): SwipeIntent {
  if (Math.abs(dx) < threshold) return null;
  if (Math.abs(dx) <= Math.abs(dy)) return null;
  return dx < 0 ? "next" : "prev";
}

export const DESIGN_W = 1920;
export const DESIGN_H = 1080;

/**
 * Scale factor that fits the fixed design space inside a viewport while
 * preserving 16:9 — the whole reason slide type never needs clamp().
 */
export function stageScale(
  viewportW: number,
  viewportH: number,
  designW = DESIGN_W,
  designH = DESIGN_H
): number {
  if (viewportW <= 0 || viewportH <= 0) return 0;
  return Math.min(viewportW / designW, viewportH / designH);
}
