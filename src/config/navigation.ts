/**
 * ---------------------------------------------------------------------------
 * NAVIGATION CONFIG — single source of truth for the bottom nav bar.
 * ---------------------------------------------------------------------------
 * The bottom bar (src/components/BottomNav.tsx) just maps over this array —
 * it has no hardcoded tabs. So to add a 5th tab later you only touch TWO
 * things:
 *   1. Create the page folder: src/app/<route>/page.tsx
 *   2. Add one object to this array (label, href, icon, iconInactive)
 * See README.md → "Adding a new page" for the full step-by-step.
 *
 * NOTE: icons are now static .svg files served straight from /public/
 * (not React components anymore, and not under an /icons subfolder) —
 * each tab has an active (red) and an inactive (muted grey) version that
 * BottomNav.tsx swaps between.
 * ---------------------------------------------------------------------------
 */

export type NavItem = {
  /** Text shown under the icon. */
  label: string;
  /** Route path — must match the folder name under src/app/. */
  href: string;
  /** Path to the icon shown when this tab IS active (red pill state). */
  icon: string;
  /** Path to the icon shown when this tab is NOT active (muted grey state). */
  iconInactive: string;
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    href: "/home",
    icon: "/home.svg",
    iconInactive: "/home_inactive.svg",
  },
  {
    label: "Activity",
    href: "/activity",
    icon: "/activity.svg",
    iconInactive: "/activity_inactive.svg",
  },
  {
    label: "Promotion",
    href: "/promotion",
    icon: "/promotion.svg",
    iconInactive: "/promotion_inactive.svg",
  },
  {
    label: "Account",
    href: "/account",
    icon: "/account.svg",
    iconInactive: "/account_inactive.svg",
  },
];
