import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useMap, CircleMarker, Popup } from 'react-leaflet';

export default function LocateControl() {
  const map = useMap();
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLocate = () => {
    if (!navigator.geolocation) {
      setError('Selain ei tue paikannusta');
      setTimeout(() => setError(null), 3000);
      return;
    }

    setLocating(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const pos: [number, number] = [latitude, longitude];
        setUserPosition(pos);
        map.flyTo(pos, 12);
        setLocating(false);
      },
      (err) => {
        const messages: Record<number, string> = {
          1: 'Sijaintilupa evätty',
          2: 'Sijainti ei saatavilla',
          3: 'Aikakatkaisu',
        };
        setError(messages[err.code] ?? 'Paikannusvirhe');
        setLocating(false);
        setTimeout(() => setError(null), 3000);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  return (
    <>
      {userPosition && (
        <CircleMarker
          center={userPosition}
          radius={10}
          pathOptions={{ color: '#059669', fillColor: '#34d399', fillOpacity: 0.3, weight: 2 }}
        >
          <Popup>Olet tässä</Popup>
        </CircleMarker>
      )}
      {createPortal(
        <button
          onClick={handleLocate}
          disabled={locating}
          className={`absolute bottom-6 right-6 z-[1000] bg-white rounded-full p-3 shadow-lg
                     hover:bg-emerald-50 active:bg-emerald-100 disabled:opacity-50
                     transition-colors cursor-pointer border border-stone-300
                     ${locating ? 'animate-pulse' : ''}`}
          title="Paikanna minut"
          aria-label="Paikanna minut"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-emerald-700">
            <circle cx="12" cy="12" r="3" />
            <line x1="12" y1="2" x2="12" y2="6" />
            <line x1="12" y1="18" x2="12" y2="22" />
            <line x1="2" y1="12" x2="6" y2="12" />
            <line x1="18" y1="12" x2="22" y2="12" />
          </svg>
        </button>,
        map.getContainer(),
      )}
      {error && createPortal(
        <div className="absolute bottom-20 right-6 z-[1000] bg-red-100 text-red-800
                        px-3 py-2 rounded-2xl shadow text-sm max-w-48">
          {error}
        </div>,
        map.getContainer(),
      )}
    </>
  );
}
