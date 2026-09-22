'use client';

import { useEffect } from "react";
import BottomNav from "@/components/BottomNav";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // DevTools ডিটেক্ট করার জন্য টাইম চেক
    const checkDevTools = () => {
      const start = performance.now();
      // debugger কল করলে DevTools খোলা থাকলে ব্রাউজার স্লো হয়ে যাবে
      debugger;
      const end = performance.now();

      // DevTools খোলা থাকলে এক্সিকিউশন টাইম বেড়ে যায় (> 100ms)
      if (end - start > 100) {
        window.location.replace('about:blank');
      }
    };

    // কিবোর্ড শর্টকাট ব্লক এবং রিডাইরেক্ট (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U)
    const preventShortcuts = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && e.key.toUpperCase() === 'U')
      ) {
        e.preventDefault();
        window.location.replace('about:blank');
      }
    };

    // কনসোল ক্লিয়ারিং এবং নিয়মিত লুপ চেক
    const interval = setInterval(() => {
      checkDevTools();
    }, 200);

    window.addEventListener('keydown', preventShortcuts);

    return () => {
      clearInterval(interval);
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
