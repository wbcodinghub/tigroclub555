import HomeIcon from "@/assets/home.svg";
import ActivityIcon from "@/assets/activity.svg";
import PromotionIcon from "@/assets/promotion.svg";
import AccountIcon from "@/assets/account.svg";
import type { ComponentType, SVGProps } from "react";

export type NavItem = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>> | any;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/home", icon: HomeIcon },
  { label: "Activity", href: "/activity", icon: ActivityIcon },
  { label: "Promotion", href: "/promotion", icon: PromotionIcon },
  { label: "Account", href: "/account", icon: AccountIcon },
];
