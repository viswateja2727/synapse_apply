import { Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';
import { soundManager } from './SoundManager';

export const SoundToggle = () => {
  const [enabled, setEnabled] = useState(soundManager.isEnabled());

  const handleToggle = () => {
    const newState = soundManager.toggle();
    setEnabled(newState);
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed top-4 right-4 z-50 p-3 rounded-full bg-card border-2 border-border 
                 hover:border-primary transition-all duration-300 hover:scale-110"
      aria-label={enabled ? 'Mute sounds' : 'Enable sounds'}
    >
      {enabled ? (
        <Volume2 className="w-6 h-6 text-primary" />
      ) : (
        <VolumeX className="w-6 h-6 text-muted-foreground" />
      )}
    </button>
  );
};
