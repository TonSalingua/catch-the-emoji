"use client";

import { useState, useEffect, useRef } from "react";
import Emoji from "./Emoji";
import confetti from "canvas-confetti";

const EMOJIS = ["🍕", "🍎", "⭐", "💎", "💙"];

interface FallingEmoji {
  id: number;
  symbol: string;
  x: number;
  size: number;
  duration: number;
}

export default function GameBoard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [emojis, setEmojis] = useState<FallingEmoji[]>([]);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [idCounter, setIdCounter] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Compute emoji fall duration based on score
  const getEmojiDuration = () => {
    const baseDuration = 5; // seconds
    const decrement = Math.floor(score / 10) * 0.5;
    return Math.max(1.5, baseDuration - decrement);
  };

  // Compute spawn interval based on score (faster with higher score)
  const getSpawnInterval = () => {
    const baseInterval = 1000; // 1 second
    const decrement = Math.floor(score / 5) * 100; // every 5 points, spawn faster
    return Math.max(400, baseInterval - decrement);
  };

  // Spawn emojis dynamically
  useEffect(() => {
    if (gameOver) return;

    const spawnEmoji = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      const emojiSize = Math.min(96, containerWidth / 6);
      const emojiX = Math.random() * (containerWidth - emojiSize);

      setEmojis((prev) => [
        ...prev,
        {
          id: idCounter,
          symbol: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
          x: emojiX,
          size: emojiSize,
          duration: getEmojiDuration(),
        },
      ]);

      setIdCounter((prev) => prev + 1);
    };

    const interval = setInterval(spawnEmoji, getSpawnInterval());
    return () => clearInterval(interval);
  }, [idCounter, gameOver, score]);

  const handleCatch = (id: number) => {
    if (gameOver) return;
    setScore((prev) => prev + 1);
    setEmojis((prev) => prev.filter((e) => e.id !== id));
    confetti({ particleCount: 30, spread: 70, origin: { y: 0.6 } });
  };

  const handleMiss = (id: number) => {
    if (gameOver) return;
    setMisses((prev) => {
      const newMiss = prev + 1;
      if (newMiss >= 10) setGameOver(true);
      return newMiss;
    });
    setEmojis((prev) => prev.filter((e) => e.id !== id));
  };

  const resetGame = () => {
    setScore(0);
    setMisses(0);
    setEmojis([]);
    setIdCounter(0);
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-8">
      {/* Game Board Container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-3xl h-[500px] bg-gradient-to-b from-blue-200 to-blue-100 overflow-hidden rounded-xl shadow-lg"
      >
        {/* Falling Emojis */}
        {emojis.map((e) => (
          <Emoji
            key={e.id}
            symbol={e.symbol}
            x={e.x}
            size={e.size}
            duration={e.duration} // dynamic speed
            onCatch={() => handleCatch(e.id)}
            onMiss={() => handleMiss(e.id)}
          />
        ))}

        {/* Score & Miss Counter */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-80 px-4 py-1 rounded-full shadow-md text-lg font-semibold text-gray-800 z-10 text-center">
          Score: {score} | Misses: {misses}/10
        </div>

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 text-white text-center z-20">
            <h2 className="text-4xl font-bold mb-2">Game Over! 💀</h2>
            <p className="text-xl mb-4">Final Score: {score}</p>
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold shadow-lg transition cursor-pointer"
            >
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}