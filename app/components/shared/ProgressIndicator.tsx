"use client";

import { FC } from "react";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

/**
 * Step progress indicator for onboarding flow
 */
export const ProgressIndicator: FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  className = "fade-in-1",
}) => (
  <div className={`text-center mb-3 ${className}`}>
    <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground font-modern">
      Step {currentStep} of {totalSteps}
    </span>
  </div>
);

interface ProgressBarProps {
  current: number;
  max: number;
  label?: string;
  showCount?: boolean;
  className?: string;
}

/**
 * Linear progress bar with optional label
 */
export const ProgressBar: FC<ProgressBarProps> = ({
  current,
  max,
  label = "Progress",
  showCount = true,
  className = "",
}) => {
  const percentage = Math.min((current / max) * 100, 100);
  const isComplete = current >= max;

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex justify-between text-xs font-modern">
        <span className="text-muted-foreground">{label}</span>
        {showCount && (
          <span className={isComplete ? "text-green-600" : "text-gray-600"}>
            {current} / {max} recommended
          </span>
        )}
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 rounded-full ${
            isComplete ? "bg-green-500" : "bg-blue-400"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
