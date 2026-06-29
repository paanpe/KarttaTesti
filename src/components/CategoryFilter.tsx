interface CategoryFilterProps {
  categories: string[];
  activeCategories: Set<string>;
  onToggle: (category: string) => void;
}

export default function CategoryFilter({ categories, activeCategories, onToggle }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const isActive = activeCategories.has(category);
        return (
          <button
            key={category}
            onClick={() => onToggle(category)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors cursor-pointer
              ${isActive
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
              }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
