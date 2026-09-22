/**
 * ---------------------------------------------------------------------------
 * NAVIGATION CONFIG — single source of truth for the bottom nav bar.
 * ---------------------------------------------------------------------------
 * The bottom bar (src/components/BottomNav.tsx) just maps over this array —
 * it has no hardcoded tabs. So to add a 5th tab later you only touch TWO
 * things:
 *   1. Create the page folder: src/app/<route>/page.tsx
 *   2. Add one object to this array (label, href, icon)
 * See README.md → "Adding a new page" for the full step-by-step.
 * ---------------------------------------------------------------------------
 */
import { AccountIcon, ActivityIcon, HomeIcon, PromotionIcon } from "@/assets/icons";
import type { ComponentType } from "react";
import type { SVGProps } from "react";

export type NavItem = {
  /** Text shown under the icon. */
  label: string;
  /** Route path — must match the folder name under src/app/. */
  href: string;
  /** Icon component, rendered with `currentColor` fill. */
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/home", icon: HomeIcon },
  { label: "Activity", href: "/activity", icon: ActivityIcon },
  { label: "Promotion", href: "/promotion", icon: PromotionIcon },
  { label: "Account", href: "/account", icon: AccountIcon },
];
