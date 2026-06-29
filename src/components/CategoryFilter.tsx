interface FilterChipsProps {
  label: string;
  options: string[];
  active: Set<string>;
  onToggle: (value: string) => void;
}

function FilterChips({ label, options, active, onToggle }: FilterChipsProps) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wide shrink-0">{label}</span>
      {options.map((option) => {
        const isActive = active.has(option);
        return (
          <button
            key={option}
            onClick={() => onToggle(option)}
            className={`px-2.5 py-0.5 rounded-full text-xs font-medium transition-all cursor-pointer border
              ${isActive
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-white/60 text-stone-500 border-stone-300 hover:border-emerald-400 hover:text-emerald-700'
              }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export interface Filters {
  categories: Set<string>;
  visited: Set<string>;
  municipalities: Set<string>;
  regions: Set<string>;
  dateRange: { from: string; to: string };
}

interface FilterPanelProps {
  filters: Filters;
  categoryOptions: string[];
  visitedOptions: string[];
  municipalityOptions: string[];
  regionOptions: string[];
  onToggle: (filterKey: keyof Omit<Filters, 'dateRange'>, value: string) => void;
  onDateChange: (field: 'from' | 'to', value: string) => void;
}

export default function FilterPanel({
  filters,
  categoryOptions,
  visitedOptions,
  municipalityOptions,
  regionOptions,
  onToggle,
  onDateChange,
}: FilterPanelProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        <FilterChips label="Tyyppi" options={categoryOptions} active={filters.categories} onToggle={(v) => onToggle('categories', v)} />
        <FilterChips label="Käyty" options={visitedOptions} active={filters.visited} onToggle={(v) => onToggle('visited', v)} />
        <FilterChips label="Maakunta" options={regionOptions} active={filters.regions} onToggle={(v) => onToggle('regions', v)} />
        <FilterChips label="Kunta" options={municipalityOptions} active={filters.municipalities} onToggle={(v) => onToggle('municipalities', v)} />
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">Käyntiaika</span>
        <input
          type="date"
          value={filters.dateRange.from}
          onChange={(e) => onDateChange('from', e.target.value)}
          className="px-2 py-0.5 rounded-lg border border-stone-300 text-xs bg-white/60 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        />
        <span className="text-xs text-stone-400">–</span>
        <input
          type="date"
          value={filters.dateRange.to}
          onChange={(e) => onDateChange('to', e.target.value)}
          className="px-2 py-0.5 rounded-lg border border-stone-300 text-xs bg-white/60 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        />
      </div>
    </div>
  );
}
