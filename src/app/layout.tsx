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

    // ১. কিবোর্ড শর্টকাট ব্লক (F12, Ctrl+Shift+I/J/C, Ctrl+U)
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

    // ২. মাউসের রাইট-ক্লিক ব্লক (যাতে কেউ রাইট-ক্লিক করে Inspect এ যেতে না পারে)
    const preventContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      redirect();
    };

    window.addEventListener("keydown", preventShortcuts);
    window.addEventListener("contextmenu", preventContextMenu);

    return () => {
      window.removeEventListener("keydown", preventShortcuts);
      window.removeEventListener("contextmenu", preventContextMenu);
    };
  }, []);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
