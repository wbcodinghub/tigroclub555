'use client';

import { useEffect } from "react";
import BottomNav from "@/components/BottomNav";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const threshold = 60;
    let redirected = false;

    const redirect = () => {
      if (!redirected) {
        redirected = true;
        window.location.replace('about:blank');
      }
    };

    // পদ্ধতি ১: সাইজ চেক (DevTools ডক করা থাকলে ধরে)
    const checkSize = () => {
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;
      if (widthDiff > threshold || heightDiff > threshold) {
        redirect();
      }
    };

    // পদ্ধতি ২: টাইমিং চেক (আন-ডক করা DevTools ধরে)
    const checkTiming = () => {
      const start = performance.now();
      // eslint-disable-next-line no-debugger
      debugger;
      const end = performance.now();
      if (end - start > 100) {
        redirect();
      }
    };

    const interval = setInterval(() => {
      checkSize();
      checkTiming();
    }, 1000); // ২০০ms থেকে বাড়িয়ে ১০০০ms করা হলো — বারবার freeze এড়াতে

    checkSize(); // পেজ লোডেই একবার

    const preventShortcuts = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && e.key.toUpperCase() === 'U')
      ) {
        e.preventDefault();
        redirect();
      }
    };

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
