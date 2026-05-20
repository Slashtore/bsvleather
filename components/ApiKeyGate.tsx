import React, { useState, useEffect } from 'react';

// Define interface for local usage to ensuring type safety when casting
interface AIStudio {
  hasSelectedApiKey: () => Promise<boolean>;
  openSelectKey: () => Promise<void>;
}

export const ApiKeyGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasKey, setHasKey] = useState(false);
  const [checking, setChecking] = useState(true);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    const checkKey = async () => {
      // Access aistudio via type assertion to avoid conflict with global declarations
      const aistudio = (window as any).aistudio as AIStudio | undefined;
      
      if (aistudio) {
        try {
          const selected = await aistudio.hasSelectedApiKey();
          setHasKey(selected);
        } catch (e) {
          console.error("Error checking API key:", e);
          // If check fails, we might not be in the environment or something is wrong.
          // Defaulting to true to allow local dev if aistudio object exists but fails.
          setHasKey(true); 
        }
      } else {
        // Not in the specific Google AI environment, allow access.
        setHasKey(true); 
      }
      setChecking(false);
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    const aistudio = (window as any).aistudio as AIStudio | undefined;
    
    if (aistudio) {
      try {
        await aistudio.openSelectKey();
        // As per instructions: assume success to avoid race conditions
        setHasKey(true);
      } catch (e) {
        console.error("API Key selection failed:", e);
        setHasKey(false);
      }
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdf8f6]">
        <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 bg-[#a18072] rounded-full mb-4"></div>
            <div className="text-[#5e4339] font-serif">Загрузка...</div>
        </div>
      </div>
    );
  }

  const aistudio = (window as any).aistudio;

  // If we don't have a key, and we haven't skipped, and we are in the AI Studio environment
  if (!hasKey && !skipped && aistudio) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdf8f6] p-6 text-center">
        <div className="max-w-md w-full bg-white p-8 rounded-sm shadow-xl border border-[#e0cec7]">
            <h1 className="text-3xl font-serif text-[#382622] mb-4">Требуется доступ</h1>
            <p className="text-[#8a6a5c] mb-6 leading-relaxed">
              Для работы интеллектуальных функций сайта (Чат-ассистент) требуется подключение API ключа Google Gemini.
            </p>
            
            <button 
              onClick={handleSelectKey}
              className="w-full bg-[#4a342e] text-white px-8 py-4 rounded-sm uppercase tracking-widest font-bold hover:bg-[#382622] transition-colors mb-4"
            >
              Выбрать API ключ
            </button>

            <button 
              onClick={() => setSkipped(true)}
              className="w-full bg-transparent text-[#8a6a5c] px-8 py-2 rounded-sm text-xs font-bold uppercase tracking-widest hover:text-[#5e4339] hover:bg-[#f2e8e5] transition-colors mb-6"
            >
              Продолжить без AI (Только дизайн)
            </button>

            <div className="text-center border-t border-[#e0cec7] pt-4">
                <a 
                href="https://ai.google.dev/gemini-api/docs/billing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-[#a18072] underline hover:text-[#5e4339]"
                >
                Информация о тарифах (Google AI Studio)
                </a>
            </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};