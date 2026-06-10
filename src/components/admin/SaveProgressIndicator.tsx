'use client';

import React from 'react';

export type SaveProgressPhase = 'uploading' | 'saving';

export type SaveProgressState = {
  phase: SaveProgressPhase;
  current: number;
  total: number;
};

type SaveProgressIndicatorProps = Readonly<{
  progress: SaveProgressState;
  savingLabel?: string;
}>;

export function SaveProgressIndicator({
  progress,
  savingLabel = 'Saving...',
}: SaveProgressIndicatorProps) {
  const { phase, current, total } = progress;

  const percent =
    phase === 'saving'
      ? 92
      : total > 0
        ? Math.min(85, Math.round((current / total) * 85))
        : 10;

  const label =
    phase === 'saving'
      ? savingLabel
      : total === 1
        ? 'Uploading image...'
        : `Uploading images (${current} of ${total})...`;

  return (
    <div
      className="rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-3"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex items-center justify-between gap-4 text-sm">
        <span className="font-medium text-gray-800">{label}</span>
        <span className="text-gray-500 tabular-nums">{percent}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out ${
            phase === 'saving' ? 'animate-pulse' : ''
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-xs text-gray-500">
        Large images can take a little while. Please keep this page open until saving completes.
      </p>
    </div>
  );
}
