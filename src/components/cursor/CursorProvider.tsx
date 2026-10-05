"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useSyncExternalStore,
  ReactNode,
} from "react";

export type CursorVariant =
  | "default"
  | "link"
  | "view"
  | "drag"
  | "pencil"
  | "bulb"
  | "text"
  | "hide"
  | "press"
  | "loupe";

export type CursorTheme = "cream" | "night";

export interface CursorState {
  variant: CursorVariant;
  label?: string;
  icon?: string;
  magnetTarget?: HTMLElement | null;
  magnetStrength?: number;
  theme: CursorTheme;
  isEnabled: boolean;
  reducedMotion: boolean;
}

export interface CursorContextValue extends CursorState {
  setVariant: (variant: CursorVariant, options?: { label?: string; icon?: string }) => void;
  resetCursor: () => void;
  setMagnetTarget: (target: HTMLElement | null, strength?: number) => void;
  setTheme: (theme: CursorTheme) => void;
  toggleCursor: () => void;
  setIsEnabled: (enabled: boolean) => void;
}

const CursorContext = createContext<CursorContextValue | null>(null);

const STORAGE_KEY = "the-intelliverse-custom-cursor";

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  motionQuery.addEventListener("change", callback);
  return () => motionQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function CursorProvider({ children }: { children: ReactNode }) {
  const [variant, setVariantState] = useState<CursorVariant>("default");
  const [label, setLabel] = useState<string | undefined>(undefined);
  const [icon, setIcon] = useState<string | undefined>(undefined);
  const [magnetTarget, setMagnetTargetState] = useState<HTMLElement | null>(null);
  const [magnetStrength, setMagnetStrength] = useState<number>(0.3);
  const [theme, setThemeState] = useState<CursorTheme>("cream");

  // Initialize preference safely without cascading re-renders
  const [isEnabled, setIsEnabledState] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "off") return false;
      if (stored === "on") return true;
    } catch {
      // Ignore storage restrictions
    }
    return true;
  });

  // System media query via useSyncExternalStore
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  // Update HTML class so cursor: none applies only when enabled
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isEnabled) {
      document.documentElement.classList.add("custom-cursor-active");
    } else {
      document.documentElement.classList.remove("custom-cursor-active");
    }
  }, [isEnabled]);

  const setIsEnabled = useCallback((enabled: boolean) => {
    setIsEnabledState(enabled);
    try {
      localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off");
    } catch {
      // Ignore
    }
  }, []);

  const toggleCursor = useCallback(() => {
    setIsEnabledState((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
      } catch {
        // Ignore
      }
      return next;
    });
  }, []);

  const setVariant = useCallback(
    (newVariant: CursorVariant, options?: { label?: string; icon?: string }) => {
      setVariantState(newVariant);
      setLabel(options?.label);
      setIcon(options?.icon);
    },
    []
  );

  const resetCursor = useCallback(() => {
    setVariantState("default");
    setLabel(undefined);
    setIcon(undefined);
    setMagnetTargetState(null);
  }, []);

  const setMagnetTarget = useCallback((target: HTMLElement | null, strength = 0.3) => {
    setMagnetTargetState(target);
    setMagnetStrength(strength);
  }, []);

  const setTheme = useCallback((newTheme: CursorTheme) => {
    setThemeState(newTheme);
  }, []);

  const contextValue = useMemo<CursorContextValue>(
    () => ({
      variant,
      label,
      icon,
      magnetTarget,
      magnetStrength,
      theme,
      isEnabled,
      reducedMotion,
      setVariant,
      resetCursor,
      setMagnetTarget,
      setTheme,
      toggleCursor,
      setIsEnabled,
    }),
    [
      variant,
      label,
      icon,
      magnetTarget,
      magnetStrength,
      theme,
      isEnabled,
      reducedMotion,
      setVariant,
      resetCursor,
      setMagnetTarget,
      setTheme,
      toggleCursor,
      setIsEnabled,
    ]
  );

  return <CursorContext.Provider value={contextValue}>{children}</CursorContext.Provider>;
}

export function useCursorContext() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursorContext must be used within a CursorProvider");
  }
  return context;
}
