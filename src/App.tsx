import { useState, useMemo } from 'react';
import MapView from './components/MapView';
import LocationTable from './components/LocationTable';
import CategoryFilter from './components/CategoryFilter';
import { locations } from './data/locations';

type Page = 'map' | 'list';

export default function App() {
  const [page, setPage] = useState<Page>('map');

  const categories = useMemo(
    () => [...new Set(locations.map((l) => l.category).filter(Boolean))] as string[],
    [],
  );

  const [activeCategories, setActiveCategories] = useState<Set<string>>(
    () => new Set(categories),
  );

  const toggleCategory = (category: string) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const filteredLocations = useMemo(
    () => locations.filter((l) => l.category && activeCategories.has(l.category)),
    [activeCategories],
  );

  return (
    <div className="h-screen w-screen flex flex-col">
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 shrink-0">
        <div className="flex items-center gap-4 shrink-0">
          <h1 className="text-xl font-bold text-gray-800">KarttaTesti</h1>
          <nav className="flex gap-1">
            <button
              onClick={() => setPage('map')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer
                ${page === 'map'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              Kartta
            </button>
            <button
              onClick={() => setPage('list')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer
                ${page === 'list'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              Lista
            </button>
          </nav>
        </div>
        <CategoryFilter
          categories={categories}
          activeCategories={activeCategories}
          onToggle={toggleCategory}
        />
        <p className="text-sm text-gray-500 hidden sm:block shrink-0 ml-auto">
          Helsingin nähtävyydet
        </p>
      </header>

      <main className="flex-1 relative">
        {page === 'map' ? (
          <MapView locations={filteredLocations} />
        ) : (
          <LocationTable locations={filteredLocations} />
        )}
      </main>
    </div>
  );
}
