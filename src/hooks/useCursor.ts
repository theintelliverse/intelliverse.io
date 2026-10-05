"use client";

import { useCursorContext, CursorVariant } from "@/components/cursor/CursorProvider";

export function useCursor() {
  const context = useCursorContext();

  const bindCursor = (variant: CursorVariant, options?: { label?: string; icon?: string }) => ({
    onMouseEnter: () => context.setVariant(variant, options),
    onMouseLeave: () => context.resetCursor(),
  });

  return {
    ...context,
    bindCursor,
  };
}
