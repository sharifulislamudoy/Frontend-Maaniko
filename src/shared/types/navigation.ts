import type { LucideIcon } from "lucide-react";

export type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  badgeCount?: number;
};

export type BrandLogoProps = {
  className: string;
  priority?: boolean;
};

export type CountBadgeProps = {
  count: number;
};

export type AnimatedMenuButtonProps = {
  open: boolean;
  label: string;
  controls: string;
  onClick: () => void;
};
