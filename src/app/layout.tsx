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

    // ১. কিবোর্ড শর্টকাট চেক
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

    // ২. ডিটেক্ট করার জন্য উইন্ডো সাইজ ও ডিবাগারের সমন্বিত পদ্ধতি
    const checkDevTools = () => {
      // ব্রাউজারের উইন্ডো হাইট বা উইডথ যদি ভেতরের কন্টেন্ট থেকে অস্বাভাবিকভাবে ছোট হয় (Inspect ওপেন হলে যা ঘটে)
      const threshold = 160;
      if (
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold
      ) {
        redirect();
      }
    };

    window.addEventListener("keydown", preventShortcuts);
    
    // প্রতি ১ সেকেন্ড পর পর Inspect ওপেন হয়েছে কি না চেক করবে
    const interval = setInterval(checkDevTools, 1000);

    return () => {
      window.removeEventListener("keydown", preventShortcuts);
      clearInterval(interval);
    };
  }, []);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
