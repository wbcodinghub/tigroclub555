"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/config/navigation";
import styles from "./BottomNav.module.css";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav} aria-label="Primary">
      <ul className={styles.list}>
        {NAV_ITEMS.map(({ label, href, IconComponent }) => {
          const isActive = pathname === href || pathname?.startsWith(`${href}/`);
          return (
            <li key={href} className={styles.item}>
              <Link
                href={href}
                className={`${styles.link} ${isActive ? styles.active : ""}`}
                aria-current={isActive ? "page" : undefined}
                onContextMenu={(e) => e.preventDefault()}
              >
                {/* <img> এর বদলে Inline SVG কম্পোনেন্ট ব্যবহার করা হয়েছে */}
                <IconComponent active={isActive} className={styles.icon} />
                <span className={styles.label}>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
