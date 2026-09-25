"use client";

import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    let redirected = false;

    // Redirect to blank page
    const redirectToBlank = () => {
      if (redirected) return;

      redirected = true;

      try {
        window.location.replace("about:blank");
      } catch {
        window.location.href = "about:blank";
      }
    };

    // -----------------------------------------
    // DevTools size detection
    // -----------------------------------------
    const widthThreshold = 160;
    const heightThreshold = 160;

    const checkDevToolsSize = () => {
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;

      return (
        widthDiff > widthThreshold ||
        heightDiff > heightThreshold
      );
    };

    let hitCount = 0;

    const runDevToolsCheck = () => {
      if (checkDevToolsSize()) {
        hitCount++;

        // Require 2 consecutive detections
        // to reduce false positives.
        if (hitCount >= 2) {
          redirectToBlank();
        }
      } else {
        hitCount = 0;
      }
    };

    // Start checking after page loads
    const startTimeout = window.setTimeout(() => {
      runDevToolsCheck();

      const interval = window.setInterval(() => {
        runDevToolsCheck();
      }, 1000);

      (
        window as Window & {
          __devToolsInterval?: number;
        }
      ).__devToolsInterval = interval;
    }, 3000);

    // -----------------------------------------
    // Keyboard shortcut protection
    // -----------------------------------------
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

    // -----------------------------------------
    // Cleanup
    // -----------------------------------------
    return () => {
      window.clearTimeout(startTimeout);

      const win = window as Window & {
        __devToolsInterval?: number;
      };

      if (win.__devToolsInterval) {
        window.clearInterval(win.__devToolsInterval);
        delete win.__devToolsInterval;
      }

      window.removeEventListener(
        "keydown",
        preventDevToolsShortcuts,
        true
      );
    };
  }, []);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
