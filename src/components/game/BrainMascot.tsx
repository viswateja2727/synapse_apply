interface BrainMascotProps {
  state: 'idle' | 'happy' | 'sad' | 'thinking';
  size?: 'sm' | 'md' | 'lg';
}

export const BrainMascot = ({ state, size = 'md' }: BrainMascotProps) => {
  const sizeClasses = {
    sm: 'text-4xl',
    md: 'text-6xl',
    lg: 'text-8xl',
  };

  const animations = {
    idle: 'floating',
    happy: 'animate-bounce-slow',
    sad: 'animate-pulse',
    thinking: 'floating',
  };

  const expressions = {
    idle: '🧠',
    happy: '🧠✨',
    sad: '🧠💔',
    thinking: '🧠💭',
  };

  return (
    <div className={`${sizeClasses[size]} ${animations[state]} select-none`}>
      {expressions[state]}
    </div>
  );
};
