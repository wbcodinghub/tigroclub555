import { AccountIcon, ActivityIcon, HomeIcon, PromotionIcon } from "@/assets/icons";
import type { ComponentType, SVGProps } from "react";

export type NavItem = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/home", icon: HomeIcon },
  { label: "Activity", href: "/activity", icon: ActivityIcon },
  { label: "Promotion", href: "/promotion", icon: PromotionIcon },
  { label: "Account", href: "/account", icon: AccountIcon },
];
