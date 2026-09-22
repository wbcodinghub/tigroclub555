"use client";

import { useEffect } from "react";

export default function DevToolsGuard() {
  useEffect(() => {
    const threshold = 160;

    const check = () => {
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;

      if (widthDiff > threshold || heightDiff > threshold) {
        window.location.replace("about:blank");
      }
    };

    const interval = setInterval(check, 500);
    return () => clearInterval(interval);
  }, []);

  return null;
}
