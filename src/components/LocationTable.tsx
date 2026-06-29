import { LocationPoint } from '../types';

interface LocationTableProps {
  locations: LocationPoint[];
}

export default function LocationTable({ locations }: LocationTableProps) {
  return (
    <div className="h-full overflow-auto bg-gray-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 font-semibold text-gray-700">Nimi</th>
                <th className="px-4 py-3 font-semibold text-gray-700 hidden sm:table-cell">Kuvaus</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Kategoria</th>
                <th className="px-4 py-3 font-semibold text-gray-700 hidden md:table-cell">Koordinaatit</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location) => (
                <tr key={location.id} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-medium text-gray-900">{location.name}</span>
                    <p className="text-gray-500 text-xs mt-0.5 sm:hidden">{location.description}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{location.description}</td>
                  <td className="px-4 py-3">
                    {location.category && (
                      <span className="inline-block px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {location.category}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-500 font-mono text-xs hidden md:table-cell">
                    {location.position[0].toFixed(4)}, {location.position[1].toFixed(4)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {locations.length === 0 && (
            <div className="px-4 py-8 text-center text-gray-400">
              Ei paikkoja valituilla suodattimilla.
            </div>
          )}
        </div>
        <p className="mt-3 text-xs text-gray-400 text-center">
          {locations.length} {locations.length === 1 ? 'paikka' : 'paikkaa'}
        </p>
      </div>
    </div>
  );
}
