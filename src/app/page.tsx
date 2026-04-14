'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Download, Smartphone } from 'lucide-react';

// Content object updated with new text
const content = {
  it: { 
    title: 'Benvenuto',
    subtitle: 'Gestione Intelligente Veicoli',
    button_text: 'Vai alla Dashboard',
    apk_button: 'Scarica APK',
    ios_button: 'Installa su iOS',
  },
  en: { 
    title: 'Welcome',
    subtitle: 'Intelligent Vehicle Management',
    button_text: 'Go to Dashboard',
    apk_button: 'Download APK',
    ios_button: 'Install on iOS',
  }
};

export default function LandingPage() {
  const router = useRouter();
  const [lang, setLang] = useState<'it' | 'en'>('en');

  useEffect(() => {
    // Basic language detection to select content
    const language = navigator.language.split('-')[0];
    if (language === 'it') {
      setLang('it');
    }
  }, []);

  const t = content[lang];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-4xl font-bold">{t.title}</h1>
      <h2 className="text-xl text-slate-300 mt-2 mb-8">{t.subtitle}</h2>
      
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Button 
          onClick={() => router.push('/dashboard')}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg text-lg"
        >
          {t.button_text}
        </Button>

        <Button 
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg text-lg flex items-center justify-center gap-2"
        >
          <Download className="h-5 w-5" />
          {t.apk_button}
        </Button>

        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-lg flex items-center justify-center gap-2"
        >
          <Smartphone className="h-5 w-5" />
          {t.ios_button}
        </Button>
      </div>

    </main>
  );
}