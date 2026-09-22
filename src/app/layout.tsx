'use client';

import { useEffect } from "react";
import BottomNav from "@/components/BottomNav";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // ১. DevTools ওপেন করলে ব্রাউজার ফ্রিজ করার জন্য Debugger লুপ
    const blockDevTools = () => {
      const startTime = performance.now();
      debugger;
      const endTime = performance.now();

      if (endTime - startTime > 100) {
        console.clear();
      }
    };

    // ২. মাউসের ডানদিকের ক্লিক (Right Click / Context Menu) পুরোপুরি বন্ধ রাখা
    const preventContextMenu = (e: MouseEvent) => e.preventDefault();

    // ৩. ইন্সপেক্ট খোলার কিবোর্ড শর্টকাট (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U) বন্ধ রাখা
    const preventShortcuts = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && e.key.toUpperCase() === 'U')
      ) {
        e.preventDefault();
      }
    };

    const interval = setInterval(blockDevTools, 500);
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
