import { useEffect, useState } from 'react';

interface ConfettiParticle {
  id: number;
  x: number;
  color: string;
  delay: number;
  size: number;
}

interface ConfettiProps {
  trigger: boolean;
}

const COLORS = [
  'hsl(185, 100%, 50%)',
  'hsl(320, 100%, 60%)',
  'hsl(145, 80%, 50%)',
  'hsl(35, 100%, 55%)',
  'hsl(270, 60%, 60%)',
];

export const Confetti = ({ trigger }: ConfettiProps) => {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);

  useEffect(() => {
    if (trigger) {
      const newParticles: ConfettiParticle[] = Array.from({ length: 50 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: Math.random() * 0.5,
        size: Math.random() * 10 + 5,
      }));
      setParticles(newParticles);

      const timer = setTimeout(() => setParticles([]), 3000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="confetti-particle"
          style={{
            left: `${particle.x}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </>
  );
};
