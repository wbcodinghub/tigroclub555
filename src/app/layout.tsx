"use client";

import { useEffect } from "react";

export default function DevToolsProtection() {
  useEffect(() => {
    let redirected = false;

    const redirectToBlank = () => {
      if (redirected) return;

      redirected = true;
      window.location.replace("about:blank");
    };

    const preventDevToolsShortcuts = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();

      // F12
      if (e.key === "F12") {
        e.preventDefault();
        e.stopPropagation();
        redirectToBlank();
        return;
      }

      // Ctrl + Shift + I
      // Ctrl + Shift + J
      // Ctrl + Shift + C
      if (
        e.ctrlKey &&
        e.shiftKey &&
        ["I", "J", "C"].includes(key)
      ) {
        e.preventDefault();
        e.stopPropagation();
        redirectToBlank();
        return;
      }

      // Ctrl + U
      if (e.ctrlKey && key === "U") {
        e.preventDefault();
        e.stopPropagation();
        redirectToBlank();
      }
    };

    window.addEventListener(
      "keydown",
      preventDevToolsShortcuts,
      true
    );

    return () => {
      window.removeEventListener(
        "keydown",
        preventDevToolsShortcuts,
        true
      );
    };
  }, []);

  return null;
}
