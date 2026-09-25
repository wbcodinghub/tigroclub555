"use client";

import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    let redirected = false;
    const redirect = () => {
      if (!redirected) {
        redirected = true;
        window.location.replace("about:blank");
      }
    };

    // সাইজ চেক (docked DevTools ধরে)
    const widthThreshold = 160;
    const heightThreshold = 160;
    const checkSize = () => {
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;
      return widthDiff > widthThreshold || heightDiff > heightThreshold;
    };

    let hitCount = 0;
    const runChecks = () => {
      if (checkSize()) {
        hitCount++;
        if (hitCount >= 2) redirect();
      } else {
        hitCount = 0;
      }
    };

    const startTimeout = setTimeout(() => {
      runChecks();
      const interval = setInterval(runChecks, 1000);
      (window as any).__devToolsInterval = interval;
    }, 3000);

    const preventShortcuts = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && e.key.toUpperCase() === "U")
      ) {
        e.preventDefault();
        redirect();
      }
    };
    window.addEventListener("keydown", preventShortcuts);

    return () => {
      clearTimeout(startTimeout);
      if ((window as any).__devToolsInterval) clearInterval((window as any).__devToolsInterval);
      window.removeEventListener("keydown", preventShortcuts);
    };
  }, []);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
