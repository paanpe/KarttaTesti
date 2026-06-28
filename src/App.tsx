import MapView from './components/MapView';

export default function App() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between shrink-0">
        <h1 className="text-xl font-bold text-gray-800">KarttaTesti</h1>
        <p className="text-sm text-gray-500 hidden sm:block">
          Helsingin nähtävyydet
        </p>
      </header>

      <main className="flex-1 relative">
        <MapView />
      </main>
    </div>
  );
}
