'use client';

import { motion } from 'framer-motion';
import { type TimelineEvent } from './types';

/**
 * Animated timeline item with pulsing dot and impact score bar.
 */
export function TimelineItem({
  event,
  index,
  isLast,
  accentColor,
}: {
  event: TimelineEvent;
  index: number;
  isLast: boolean;
  accentColor: string;
}) {
  const impactColor = event.impactScore >= 8 ? '#ff2244'
    : event.impactScore >= 6 ? '#f97316' : '#eab308';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-10px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="flex gap-3 sm:gap-4"
    >
      <div className="flex flex-col items-center shrink-0">
        <motion.div
          className="w-3 h-3 rounded-full relative"
          style={{ backgroundColor: impactColor, boxShadow: `0 0 10px ${impactColor}60` }}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
        >
          <motion.div
            className="absolute inset-[-4px] rounded-full"
            style={{ border: `1px solid ${impactColor}40` }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
        {!isLast && (
          <div
            className="w-[1px] flex-1 min-h-[24px]"
            style={{ background: `linear-gradient(to bottom, ${impactColor}40, transparent)` }}
          />
        )}
      </div>
      <div className="flex-1 pb-3 sm:pb-4 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="text-[10px] font-mono text-[#505070]">{event.date}</span>
          <span
            className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-sm tracking-wider"
            style={{
              backgroundColor: `${impactColor}15`,
              color: impactColor,
              border: `1px solid ${impactColor}30`,
            }}
          >
            {event.category}
          </span>
        </div>
        <h4 className="text-xs sm:text-sm font-mono font-bold text-white mb-1">
          {event.title}
        </h4>
        <p className="text-[10px] font-mono text-[#7070a0] leading-relaxed mb-1.5">
          {event.description}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-mono text-[#505070] shrink-0">Impact:</span>
          <div className="flex-1 h-1.5 rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(to right, ${impactColor}50, ${impactColor})`,
                boxShadow: `0 0 6px ${impactColor}30`,
              }}
              initial={{ width: 0 }}
              whileInView={{ width: `${(event.impactScore / 10) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: index * 0.1 + 0.3 }}
            />
          </div>
          <span className="text-[10px] font-mono font-bold shrink-0"
            style={{ color: impactColor }}
          >
            {event.impactScore.toFixed(1)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
