"use client";

import { FC } from "react";
import { LockIcon, ShieldIcon } from "./Icons";

interface TrustFooterProps {
  message: string;
  variant?: "lock" | "shield";
  className?: string;
}

/**
 * Trust/privacy footer component
 * Used at the bottom of onboarding screens to reassure users
 */
export const TrustFooter: FC<TrustFooterProps> = ({
  message,
  variant = "shield",
  className = "fade-in-5",
}) => (
  <div
    className={`flex items-center justify-center gap-2 text-xs text-muted-foreground mt-3 font-modern ${className}`}
  >
    {variant === "lock" ? <LockIcon size={12} /> : <ShieldIcon size={12} />}
    <span>{message}</span>
  </div>
);
