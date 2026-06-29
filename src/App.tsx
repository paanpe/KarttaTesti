import { useState, useMemo, useCallback } from 'react';
import MapView from './components/MapView';
import LocationTable from './components/LocationTable';
import FilterPanel, { Filters } from './components/CategoryFilter';
import { locations } from './data/locations';

type Page = 'map' | 'list';

function uniqueSorted(values: string[]): string[] {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b, 'fi'));
}

export default function App() {
  const [page, setPage] = useState<Page>('map');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categoryOptions = useMemo(() => uniqueSorted(locations.map((l) => l.category)), []);
  const visitedOptions = useMemo(() => ['kyllä', 'ei'], []);
  const municipalityOptions = useMemo(() => uniqueSorted(locations.map((l) => l.municipality)), []);
  const regionOptions = useMemo(() => uniqueSorted(locations.map((l) => l.region)), []);

  const [filters, setFilters] = useState<Filters>(() => ({
    categories: new Set(categoryOptions),
    visited: new Set(visitedOptions),
    municipalities: new Set(municipalityOptions),
    regions: new Set(regionOptions),
    dateRange: { from: '', to: '' },
  }));

  const handleToggle = useCallback((filterKey: keyof Omit<Filters, 'dateRange'>, value: string) => {
    setFilters((prev) => {
      const next = new Set(prev[filterKey]);
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return { ...prev, [filterKey]: next };
    });
  }, []);

  const handleDateChange = useCallback((field: 'from' | 'to', value: string) => {
    setFilters((prev) => ({
      ...prev,
      dateRange: { ...prev.dateRange, [field]: value },
    }));
  }, []);

  const filteredLocations = useMemo(() => {
    return locations.filter((l) => {
      if (!filters.categories.has(l.category)) return false;
      const visitedLabel = l.visited ? 'kyllä' : 'ei';
      if (!filters.visited.has(visitedLabel)) return false;
      if (!filters.municipalities.has(l.municipality)) return false;
      if (!filters.regions.has(l.region)) return false;
      if (filters.dateRange.from && l.visitDate < filters.dateRange.from) return false;
      if (filters.dateRange.to && l.visitDate > filters.dateRange.to) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="h-screen w-screen flex flex-col bg-stone-100">
      <header className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-700 px-4 py-3 shrink-0 shadow-md">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-emerald-200">
              <path d="M3 20 L7 4 L12 12 L17 6 L21 20 Z" strokeLinejoin="round" />
              <circle cx="17" cy="6" r="2" fill="currentColor" />
            </svg>
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">Retkikartta</h1>
          </div>
          <nav className="flex gap-1 bg-emerald-900/30 rounded-full p-0.5">
            <button
              onClick={() => setPage('map')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all cursor-pointer
                ${page === 'map'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-emerald-100 hover:text-white'
                }`}
            >
              Kartta
            </button>
            <button
              onClick={() => setPage('list')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all cursor-pointer
                ${page === 'list'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-emerald-100 hover:text-white'
                }`}
            >
              Lista
            </button>
          </nav>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium
                       bg-emerald-900/30 text-emerald-100 hover:text-white transition-all cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z" clipRule="evenodd" />
            </svg>
            <span className="hidden sm:inline">Suodattimet</span>
          </button>
          <p className="text-sm text-emerald-200 hidden lg:block shrink-0">
            {filteredLocations.length} / {locations.length} kohdetta
          </p>
        </div>
      </header>

      {filtersOpen && (
        <div className="bg-gradient-to-b from-stone-50 to-stone-100 border-b border-stone-200 px-4 py-3 shadow-inner shrink-0">
          <FilterPanel
            filters={filters}
            categoryOptions={categoryOptions}
            visitedOptions={visitedOptions}
            municipalityOptions={municipalityOptions}
            regionOptions={regionOptions}
            onToggle={handleToggle}
            onDateChange={handleDateChange}
          />
        </div>
      )}

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
