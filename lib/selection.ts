import { STORAGE_KEY } from "./brand";
import type { DesignId } from "./types";

export function readSelectedDesign(): DesignId | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  if (value === "A" || value === "B" || value === "C" || value === "D") {
    return value;
  }
  return null;
}

export function writeSelectedDesign(id: DesignId) {
  window.localStorage.setItem(STORAGE_KEY, id);
}

export function clearSelectedDesign() {
  window.localStorage.removeItem(STORAGE_KEY);
}
