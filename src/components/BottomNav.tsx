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
 * Icons are plain .svg files in /public/ (see src/config/navigation.ts)
 * — each tab has an active and an inactive file, and we swap the <img> src
 * based on the current route instead of tinting one shared component.
 *
 * Mobile long-press menu: onContextMenu is blocked and the <img> is set to
 * pointer-events: none (in BottomNav.module.css, class .icon) + draggable
 * false, so a long-press on a tab passes straight through to the <Link>
 * instead of Chrome treating it as an image/link and popping up its own
 * "Open image / Download link / Share link" menu.
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
                onContextMenu={(e) => e.preventDefault()}
              >
                <img
                  src={isActive ? icon : iconInactive}
                  alt=""
                  className={styles.icon}
                  width={24}
                  height={24}
                  draggable={false}
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
