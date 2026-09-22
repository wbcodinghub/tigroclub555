'use client';

import { useEffect } from "react";
import BottomNav from "@/components/BottomNav";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. DevTools screen resize detect kore about:blank -e niye jabe
    const detectDevTools = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;

      if (widthThreshold || heightThreshold) {
        window.location.href = 'about:blank';
      }
    };

    // 2. Right Click bondho kora
    const preventContextMenu = (e: MouseEvent) => e.preventDefault();

    // 3. F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U shortcut bondho kora
    const preventShortcuts = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && e.key.toUpperCase() === 'U')
      ) {
        e.preventDefault();
        window.location.href = 'about:blank';
      }
    };

    const interval = setInterval(detectDevTools, 500);
    window.addEventListener('contextmenu', preventContextMenu);
    window.addEventListener('keydown', preventShortcuts);

    return () => {
      clearInterval(interval);
      window.removeEventListener('contextmenu', preventContextMenu);
      window.removeEventListener('keydown', preventShortcuts);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Lottery</title>
        <meta name="description" content="Lottery" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body>
        <div className="page">{children}</div>
        <BottomNav />
      </body>
    </html>
  );
}
