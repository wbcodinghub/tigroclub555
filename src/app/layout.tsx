"use client";

import { useEffect } from "react";

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // কোনো ব্লকিং বা about:blank রিডাইরেক্ট রাখা হয়নি।
    // ওয়েবসাইট এখন সম্পূর্ণ স্বাভাবিকভাবে চলবে।
  }, []);

  return <>{children}</>;
}
