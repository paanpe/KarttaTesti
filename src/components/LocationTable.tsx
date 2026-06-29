import { LocationPoint } from '../types';

interface LocationTableProps {
  locations: LocationPoint[];
}

export default function LocationTable({ locations }: LocationTableProps) {
  return (
    <div className="h-full overflow-auto bg-gradient-to-b from-stone-50 to-stone-100 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
                <th className="px-4 py-3 font-semibold text-emerald-900">Nimi</th>
                <th className="px-4 py-3 font-semibold text-emerald-900 hidden lg:table-cell">Kuvaus</th>
                <th className="px-4 py-3 font-semibold text-emerald-900">Tyyppi</th>
                <th className="px-4 py-3 font-semibold text-emerald-900">Käyty</th>
                <th className="px-4 py-3 font-semibold text-emerald-900 hidden md:table-cell">Käyntiaika</th>
                <th className="px-4 py-3 font-semibold text-emerald-900 hidden sm:table-cell">Kunta</th>
                <th className="px-4 py-3 font-semibold text-emerald-900 hidden xl:table-cell">Maakunta</th>
                <th className="px-4 py-3 font-semibold text-emerald-900 hidden md:table-cell">Linkki</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location) => (
                <tr key={location.id} className="border-b border-stone-100 last:border-b-0 hover:bg-emerald-50/40 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-medium text-stone-900">{location.name}</span>
                    <p className="text-stone-400 text-xs mt-0.5 lg:hidden">{location.description}</p>
                    <p className="text-stone-400 text-xs mt-0.5 sm:hidden">{location.municipality}, {location.region}</p>
                  </td>
                  <td className="px-4 py-3 text-stone-600 hidden lg:table-cell max-w-xs">{location.description}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full whitespace-nowrap">
                      {location.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full ${
                      location.visited
                        ? 'bg-green-100 text-green-800'
                        : 'bg-stone-100 text-stone-500'
                    }`}>
                      {location.visited ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                          <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                        </svg>
                      ) : null}
                      {location.visited ? 'Kyllä' : 'Ei'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-stone-500 text-xs hidden md:table-cell whitespace-nowrap">
                    {new Date(location.visitDate).toLocaleDateString('fi-FI')}
                  </td>
                  <td className="px-4 py-3 text-stone-600 hidden sm:table-cell whitespace-nowrap">{location.municipality}</td>
                  <td className="px-4 py-3 text-stone-600 hidden xl:table-cell whitespace-nowrap">{location.region}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <a
                      href={location.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:text-emerald-900 underline text-xs whitespace-nowrap"
                    >
                      Luontoon.fi &rarr;
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {locations.length === 0 && (
            <div className="px-4 py-12 text-center text-stone-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 mx-auto mb-2 text-stone-300">
                <path d="M3 20 L7 4 L12 12 L17 6 L21 20 Z" strokeLinejoin="round" />
              </svg>
              Ei kohteita valituilla suodattimilla.
            </div>
          )}
        </div>
        <p className="mt-3 text-xs text-stone-400 text-center">
          {locations.length} {locations.length === 1 ? 'kohde' : 'kohdetta'}
        </p>
      </div>
    </div>
  );
}
