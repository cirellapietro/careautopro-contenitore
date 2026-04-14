'use client';

import { useVoiceCommands } from '@/hooks/useVoiceCommands';

export const VoiceProvider = ({ children }: { children: React.ReactNode }) => {
  useVoiceCommands(); // Attiva i comandi vocali
  return <>{children}</>;
};
