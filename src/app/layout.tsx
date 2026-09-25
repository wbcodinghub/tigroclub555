"use client";

import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    let redirected = false;

    const goBlank = () => {
      if (redirected) return;

      redirected = true;
      window.location.replace("about:blank");
    };

    // ------------------------------------
    // Detect opened DevTools
    // ------------------------------------
    let lastTime = performance.now();

    const detectDevTools = () => {
      const start = performance.now();

      // debugger pauses here when DevTools debugger
      // is attached/open in many Chromium cases.
      debugger;

      const elapsed = performance.now() - start;

      if (elapsed > 100) {
        goBlank();
      }

      lastTime = performance.now();
    };

    const devToolsTimer = window.setInterval(
      detectDevTools,
      1000
    );

    // ------------------------------------
    // F12 / DevTools shortcuts
    // ------------------------------------
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();

      // F12
      if (e.key === "F12") {
        e.preventDefault();
        e.stopPropagation();
        goBlank();
        return;
      }

      // Ctrl + Shift + I/J/C
      if (
        e.ctrlKey &&
        e.shiftKey &&
        ["I", "J", "C"].includes(key)
      ) {
        e.preventDefault();
        e.stopPropagation();
        goBlank();
        return;
      }

      // Ctrl + U
      if (e.ctrlKey && key === "U") {
        e.preventDefault();
        e.stopPropagation();
        goBlank();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
      true
    );

    return () => {
      window.clearInterval(devToolsTimer);

      window.removeEventListener(
        "keydown",
        handleKeyDown,
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
