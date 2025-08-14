"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
}

export function ConfettiEffect({ duration = 5000 }: { duration?: number }) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [isActive, setIsActive] = useState(true);

  const colors = useMemo(() => [
    "#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", 
    "#96CEB4", "#FECA57", "#FF9FF3", "#54A0FF"
  ], []);

  useEffect(() => {
    // Créer les confettis
    const pieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      rotation: Math.random() * 360,
    }));

    setConfetti(pieces);

    // Arrêter l'effet après la durée spécifiée
    const timer = setTimeout(() => {
      setIsActive(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, colors]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "0",
          }}
          initial={{
            y: -10,
            rotate: piece.rotation,
            opacity: 1,
          }}
          animate={{
            y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
            rotate: piece.rotation + 360,
            opacity: 0,
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            ease: "easeOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

export default ConfettiEffect;
