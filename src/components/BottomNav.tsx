"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/config/navigation";
import styles from "./BottomNav.module.css";

/**
 * One nav bar, one piece of markup, used on every screen size.
 *
 * IMPORTANT (perf/smoothness): we do NOT render a "mobile nav" and a
 * "desktop nav" and hide one with `display: none`. That would make the
 * browser build, style and paint two navbars on every device — wasted
 * work on phones especially. Instead this single <nav> is repositioned
 * and restyled purely with CSS media queries (see BottomNav.module.css),
 * so only one nav ever exists in the DOM.
 *
 * Icons are plain .svg files in /public/icons/ (see src/config/navigation.ts)
 * — each tab has an active and an inactive file, and we swap the <img> src
 * based on the current route instead of tinting one shared component.
 */
export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav} aria-label="Primary">
      <ul className={styles.list}>
        {NAV_ITEMS.map(({ label, href, icon, iconInactive }) => {
          const isActive = pathname === href || pathname?.startsWith(`${href}/`);
          return (
            <li key={href} className={styles.item}>
              <Link
                href={href}
                className={`${styles.link} ${isActive ? styles.active : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <img
                  src={isActive ? icon : iconInactive}
                  alt=""
                  className={styles.icon}
                  width={24}
                  height={24}
                />
                <span className={styles.label}>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
