"use client";

import { useEffect } from "react";

export default function DevToolsGuard() {
  useEffect(() => {
    const threshold = 60; // ১৬০ থেকে কমিয়ে ৬০ করা হলো

    const check = () => {
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;

      if (widthDiff > threshold || heightDiff > threshold) {
        window.location.replace("about:blank");
      }
    };

    const interval = setInterval(check, 500);
    check(); // পেজ লোড হওয়ার সাথে সাথে একবার চেক
    return () => clearInterval(interval);
  }, []);

  return null;
}
