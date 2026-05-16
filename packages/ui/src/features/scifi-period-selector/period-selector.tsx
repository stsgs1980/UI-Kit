'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../tokens/cn';

/**
 * A single period option in the selector.
 * @example
 * ```tsx
 * const options: PeriodOption[] = [
 *   { value: '7d', label: '7D' },
 *   { value: '30d', label: '30D' },
 * ];
 * ```
 */
export interface PeriodOption {
  /** Unique value identifying this period. */
  value: string;
  /** Display label. */
  label: string;
}

export interface ScifiPeriodSelectorProps {
  /** Currently selected period value. */
  value: string;
  /** Callback fired when a new period is selected. */
  onChange: (value: string) => void;
  /** Available period options. */
  options: PeriodOption[];
  /** Accessible group label shown before the buttons. */
  groupLabel?: string;
  /** Additional CSS class names. */
  className?: string;
}

/**
 * Sci-fi styled period toggle-group selector.
 * Renders a row of glowing segmented buttons with corner accents
 * on the inactive state and a bright fill on the active option.
 *
 * @example
 * ```tsx
 * <ScifiPeriodSelector
 *   value={period}
 *   onChange={setPeriod}
 *   options={[
 *     { value: '7d', label: '7D' },
 *     { value: '30d', label: '30D' },
 *     { value: '90d', label: '90D' },
 *     { value: '1y', label: '1Y' },
 *   ]}
 *   groupLabel="PERIOD"
 * />
 * ```
 */
export const ScifiPeriodSelector = forwardRef<HTMLDivElement, ScifiPeriodSelectorProps>(
  function ScifiPeriodSelector({ value, onChange, options, groupLabel = 'PERIOD', className }, ref) {
    return (
      <div ref={ref} data-slot="scifi-period-selector"
        className={cn('flex items-center gap-3', className)}>
        <span className="font-mono text-[9px] text-[#7070a0] tracking-wider uppercase select-none">
          {groupLabel}:
        </span>

        <div className="relative flex items-center gap-0">
          {options.map((option) => {
            const isActive = value === option.value;
            return (
              <motion.button
                key={option.value}
                onClick={() => onChange(option.value)}
                className={cn(
                  'relative px-3 py-1.5 font-mono text-xs tracking-wider',
                  'transition-colors duration-200 cursor-pointer',
                  isActive
                    ? 'text-[#050510] font-bold'
                    : 'text-[#7070a0] hover:text-[#b0b0d0]',
                )}
                style={{
                  border: isActive
                    ? '1px solid #00e5ff'
                    : '1px solid rgba(0, 229, 255, 0.15)',
                  backgroundColor: isActive ? '#00e5ff' : 'transparent',
                  boxShadow: isActive
                    ? '0 0 12px rgba(0, 229, 255, 0.4), 0 0 24px rgba(0, 229, 255, 0.15), inset 0 0 8px rgba(0, 0, 0, 0.2)'
                    : 'none',
                  clipPath: 'none',
                  position: 'relative',
                  zIndex: 1,
                }}
                whileHover={!isActive ? { borderColor: 'rgba(0, 229, 255, 0.4)' } : {}}
                whileTap={{ scale: 0.97 }}
              >
                {!isActive && (
                  <>
                    <span className="absolute top-0 left-0 w-1.5 h-px bg-[rgba(0,229,255,0.3)]" />
                    <span className="absolute top-0 left-0 w-px h-1.5 bg-[rgba(0,229,255,0.3)]" />
                    <span className="absolute top-0 right-0 w-1.5 h-px bg-[rgba(0,229,255,0.3)]" />
                    <span className="absolute top-0 right-0 w-px h-1.5 bg-[rgba(0,229,255,0.3)]" />
                    <span className="absolute bottom-0 left-0 w-1.5 h-px bg-[rgba(0,229,255,0.3)]" />
                    <span className="absolute bottom-0 left-0 w-px h-1.5 bg-[rgba(0,229,255,0.3)]" />
                    <span className="absolute bottom-0 right-0 w-1.5 h-px bg-[rgba(0,229,255,0.3)]" />
                    <span className="absolute bottom-0 right-0 w-px h-1.5 bg-[rgba(0,229,255,0.3)]" />
                  </>
                )}
                {option.label}
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  },
);
