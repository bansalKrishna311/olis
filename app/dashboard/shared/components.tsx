"use client";

import { FC, ReactNode, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LucideIcon } from "lucide-react";
import { LOADING_SPINNER_CLASSES } from "./styles";

interface LoadingSpinnerProps {
  className?: string;
}

/**
 * Loading spinner for dashboard pages
 */
export const LoadingSpinner: FC<LoadingSpinnerProps> = ({ className = "" }) => (
  <div className={`flex items-center justify-center min-h-[400px] ${className}`}>
    <div className={LOADING_SPINNER_CLASSES} />
  </div>
);

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  actions?: ReactNode;
}

/**
 * Standard page header for dashboard pages
 */
export const PageHeader: FC<PageHeaderProps> = ({
  title,
  description,
  className = "fade-in-1",
  actions,
}) => (
  <div className={`flex items-center justify-between ${className}`}>
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 font-modern">{title}</h1>
      {description && <p className="text-gray-500 font-modern mt-1">{description}</p>}
    </div>
    {actions}
  </div>
);

interface SectionHeaderProps {
  title: string;
  className?: string;
  actions?: ReactNode;
}

/**
 * Section header for dashboard sections
 */
export const SectionHeader: FC<SectionHeaderProps> = ({ title, className = "", actions }) => (
  <div className={`flex items-center justify-between mb-3 ${className}`}>
    <h3 className="text-sm font-medium text-gray-500 font-modern uppercase tracking-wide">
      {title}
    </h3>
    {actions}
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// STAT CARD - Reusable metric display card
// ═══════════════════════════════════════════════════════════════════════════

interface StatCardProps {
  icon: LucideIcon;
  iconColor?: string;
  value: string | number;
  label: string;
  sublabel?: string;
  timeRange?: string;
}

/**
 * Stat card for displaying metrics
 */
export const StatCard: FC<StatCardProps> = ({
  icon: Icon,
  iconColor = "text-gray-400",
  value,
  label,
  sublabel,
  timeRange,
}) => (
  <Card className="border-0 shadow-sm">
    <CardContent className="p-4">
      <div className="flex items-center justify-between mb-2">
        <Icon className={`h-4 w-4 ${iconColor}`} />
        {timeRange && <span className="text-xs text-gray-400 font-modern">{timeRange}</span>}
      </div>
      <p className="text-2xl font-semibold text-gray-900 font-modern">{value}</p>
      <p className="text-xs text-gray-500 font-modern mt-1">{label}</p>
      {sublabel && <p className="text-[10px] text-gray-400 font-modern mt-2">{sublabel}</p>}
    </CardContent>
  </Card>
);

// ═══════════════════════════════════════════════════════════════════════════
// ACTION CARD - Clickable card with icon for navigation
// ═══════════════════════════════════════════════════════════════════════════

interface ActionCardProps {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  description: string;
  onClick: () => void;
}

/**
 * Action card for dashboard navigation
 */
export const ActionCard: FC<ActionCardProps> = ({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  subtitle,
  description,
  onClick,
}) => (
  <Card
    className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
    onClick={onClick}
  >
    <CardContent className="p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 font-modern">{title}</h4>
            <p className="text-xs text-gray-500 font-modern mt-0.5">{subtitle}</p>
          </div>
        </div>
        <svg
          className="h-5 w-5 text-gray-300 group-hover:text-gray-500 transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-600 font-modern">{description}</p>
      </div>
    </CardContent>
  </Card>
);

// ═══════════════════════════════════════════════════════════════════════════
// RECOMMENDATION ITEM - For tips and suggestions
// ═══════════════════════════════════════════════════════════════════════════

interface RecommendationItemProps {
  icon: LucideIcon;
  iconColor?: string;
  title: string;
  description: string;
}

/**
 * Recommendation list item
 */
export const RecommendationItem: FC<RecommendationItemProps> = ({
  icon: Icon,
  iconColor = "text-amber-500",
  title,
  description,
}) => (
  <li className="flex items-start gap-3">
    <Icon className={`h-4 w-4 ${iconColor} mt-0.5 shrink-0`} />
    <div>
      <p className="text-sm text-gray-700 font-modern">{title}</p>
      <p className="text-xs text-gray-500 font-modern">{description}</p>
    </div>
  </li>
);

// ═══════════════════════════════════════════════════════════════════════════
// CHIP - Selectable tag/chip component
// ═══════════════════════════════════════════════════════════════════════════

interface ChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  variant?: "default" | "danger";
  size?: "sm" | "md";
}

/**
 * Selectable chip/tag component
 */
export const Chip: FC<ChipProps> = ({
  label,
  selected,
  onClick,
  variant = "default",
  size = "md",
}) => {
  const colorClasses =
    variant === "danger"
      ? selected
        ? "bg-red-50 border-red-400 text-red-700 shadow-sm"
        : "bg-white border-gray-200 text-gray-600 hover:border-red-300 hover:bg-red-50/50"
      : selected
        ? "bg-blue-50 border-blue-400 text-blue-700 shadow-sm"
        : "bg-white border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50/50";

  const sizeClasses = size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm";

  return (
    <button
      onClick={onClick}
      className={`rounded-full border font-medium transition-all duration-200 flex items-center gap-1.5 ${colorClasses} ${sizeClasses}`}
    >
      {label}
      {selected && (
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </button>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// POST PREVIEW CARD
// ═══════════════════════════════════════════════════════════════════════════

interface PostPreviewCardProps {
  content: string;
  index?: number;
  isFeatured?: boolean;
  showCharCount?: boolean;
}

/**
 * Post preview card component
 */
export const PostPreviewCard: FC<PostPreviewCardProps> = ({
  content,
  index,
  isFeatured = false,
  showCharCount = true,
}) => (
  <Card className="border-0 shadow-sm">
    <CardContent className="p-4">
      <div className="flex items-center justify-between mb-2">
        {index !== undefined && (
          <span className="text-xs text-gray-400 font-modern">Post {index + 1}</span>
        )}
        {isFeatured && (
          <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-modern">
            Featured
          </span>
        )}
      </div>
      <p className="text-sm text-gray-700 font-modern line-clamp-3">{content}</p>
      {showCharCount && (
        <p className="text-[10px] text-gray-400 font-modern mt-2">{content.length} characters</p>
      )}
    </CardContent>
  </Card>
);

// ═══════════════════════════════════════════════════════════════════════════
// PROGRESS BAR
// ═══════════════════════════════════════════════════════════════════════════

interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  showLabel?: boolean;
  label?: string;
}

/**
 * Simple progress bar component
 */
export const ProgressBar: FC<ProgressBarProps> = ({
  value,
  max,
  color = "bg-blue-500",
  showLabel = false,
  label,
}) => {
  const percentage = max > 0 ? (value / max) * 100 : 0;

  return (
    <div className="space-y-1">
      {showLabel && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 font-modern">{label}</span>
          <span className="text-sm font-medium text-gray-900 font-modern">{value}</span>
        </div>
      )}
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div className={`${color} h-2 rounded-full`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// STATUS BADGE
// ═══════════════════════════════════════════════════════════════════════════

interface StatusBadgeProps {
  status: "set" | "missing" | "active" | "low";
  label?: string;
}

/**
 * Status badge for profile fields
 */
export const StatusBadge: FC<StatusBadgeProps> = ({ status, label }) => {
  const configs = {
    set: { bg: "bg-green-100", text: "text-green-700", defaultLabel: "Set" },
    missing: { bg: "bg-gray-100", text: "text-gray-500", defaultLabel: "Missing" },
    active: { bg: "bg-green-100", text: "text-green-700", defaultLabel: "Active" },
    low: { bg: "bg-amber-100", text: "text-amber-700", defaultLabel: "Low" },
  };

  const config = configs[status];

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-modern ${config.bg} ${config.text}`}>
      {label || config.defaultLabel}
    </span>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// CHIP SELECTOR - Multi-select chip group with custom value support
// ═══════════════════════════════════════════════════════════════════════════

interface ChipSelectorProps {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  customValues?: string[];
  onAddCustom?: (value: string) => void;
  onRemoveCustom?: (value: string) => void;
  variant?: "default" | "danger";
}

/**
 * Multi-select chip group with optional custom value input
 */
export const ChipSelector: FC<ChipSelectorProps> = ({
  options,
  selected,
  onToggle,
  customValues = [],
  onAddCustom,
  onRemoveCustom,
  variant = "default",
}) => {
  const [customInput, setCustomInput] = useState("");

  const handleAddCustom = () => {
    if (customInput.trim() && onAddCustom && !customValues.includes(customInput.trim())) {
      onAddCustom(customInput.trim());
      setCustomInput("");
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Chip
            key={option}
            label={option}
            selected={selected.includes(option)}
            onClick={() => onToggle(option)}
            variant={variant}
          />
        ))}
        {customValues.map((value) => (
          <span
            key={value}
            className={`px-3 py-1.5 rounded-full border text-sm font-medium flex items-center gap-1.5 ${
              variant === "danger"
                ? "bg-red-50 border-red-400 text-red-700"
                : "bg-blue-50 border-blue-400 text-blue-700"
            }`}
          >
            {value}
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {onRemoveCustom && (
              <button onClick={() => onRemoveCustom(value)} className="ml-0.5 hover:opacity-60">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </span>
        ))}
      </div>
      {onAddCustom && (
        <div className="flex gap-2 max-w-xs">
          <Input
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddCustom()}
            placeholder="Add your own..."
            className="h-9 text-sm"
          />
          <Button onClick={handleAddCustom} size="sm" variant="outline" className="h-9 px-3">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </Button>
        </div>
      )}
    </div>
  );
};
