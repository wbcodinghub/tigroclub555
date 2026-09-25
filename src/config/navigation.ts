import React from "react";
import {
  HomeIcon,
  ActivityIcon,
  PromotionIcon,
  AccountIcon,
} from "@/components/icons/NavIcons";

export type NavItem = {
  label: string;
  href: string;
  IconComponent: React.ComponentType<{ active: boolean; className?: string }>;
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    href: "/home",
    IconComponent: HomeIcon,
  },
  {
    label: "Activity",
    href: "/activity",
    IconComponent: ActivityIcon,
  },
  {
    label: "Promotion",
    href: "/promotion",
    IconComponent: PromotionIcon,
  },
  {
    label: "Account",
    href: "/account",
    IconComponent: AccountIcon,
  },
];
