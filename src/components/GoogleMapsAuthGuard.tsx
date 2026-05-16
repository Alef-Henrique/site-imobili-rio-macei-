import React from 'react';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

export function GoogleMapsAuthGuard({ children }: { children: React.ReactNode }) {
  if (!hasValidKey) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
        <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-6 text-sky-600">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Google Maps API Key Requerida</h2>
        <p className="text-slate-500 max-w-md mb-8 text-sm leading-relaxed">
          Para utilizar as funcionalidades premium de localização e autocomplete, adicione sua chave de API nos segredos do AI Studio.
        </p>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-left w-full max-w-sm">
          <h3 className="text-xs font-black uppercase tracking-widest text-sky-600 mb-4">Como configurar:</h3>
          <ol className="text-xs space-y-3 text-slate-600 font-semibold list-decimal list-inside">
            <li>Acesse o <a href="https://console.cloud.google.com/google/maps-apis/start" target="_blank" rel="noopener" className="text-sky-600 underline">Google Cloud Console</a></li>
            <li>Abra as <strong>Configurações</strong> (ícone de engrenagem) e vá em <strong>Secrets</strong></li>
            <li>Crie o segredo <code>GOOGLE_MAPS_PLATFORM_KEY</code></li>
            <li>Cole sua chave e salve</li>
          </ol>
        </div>
        <p className="mt-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">O App irá reconstruir automaticamente após salvar.</p>
      </div>
    );
  }

  return <>{children}</>;
}
