"use client";

import { motion } from "framer-motion";

interface EmojiProps {
  symbol: string;
  x: number;
  size: number;
  onCatch: () => void;
  duration?: number;
  onMiss?: () => void;
}

export default function Emoji({
  symbol,
  x,
  size,
  onCatch,
  duration = 5,
  onMiss,
}: EmojiProps) {
  return (
    <motion.div
      className="absolute cursor-pointer select-none flex items-center justify-center touch-none"
      style={{
        left: x,
        width: size,
        height: size,
      }}
      animate={{ y: 500 }}
      transition={{ duration, ease: "linear" }}
      onClick={onCatch}
      onAnimationComplete={onMiss} // triggers miss when reaches bottom
    >
      <div
        className="flex items-center justify-center"
        style={{ width: size, height: size, fontSize: size * 0.6 }}
      >
        {symbol}
      </div>
    </motion.div>
  );
}