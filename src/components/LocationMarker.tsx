import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { LocationPoint } from '../types';

function createMarkerIcon(visited: boolean): L.DivIcon {
  const color = visited ? '#059669' : '#9ca3af';
  const bg = visited ? '#d1fae5' : '#f3f4f6';
  const check = visited
    ? '<path d="M6 10 L9 13 L14 7" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
    : '<circle cx="10" cy="9" r="3" fill="white"/>';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="38" viewBox="0 0 28 38">
    <path d="M14 37 C14 37 2 22 2 13 C2 6.4 7.4 1 14 1 C20.6 1 26 6.4 26 13 C26 22 14 37 14 37Z" fill="${color}" stroke="${bg}" stroke-width="1.5"/>
    <circle cx="14" cy="13" r="8" fill="${bg}"/>
    <g transform="translate(4,4)">${check}</g>
  </svg>`;

  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [28, 38],
    iconAnchor: [14, 38],
    popupAnchor: [0, -36],
  });
}

const visitedIcon = createMarkerIcon(true);
const unvisitedIcon = createMarkerIcon(false);

interface LocationMarkerProps {
  location: LocationPoint;
}

export default function LocationMarker({ location }: LocationMarkerProps) {
  const icon = location.visited ? visitedIcon : unvisitedIcon;

  return (
    <Marker position={location.position} icon={icon}>
      <Popup>
        <div className="p-1 min-w-[180px]">
          <h3 className="font-bold text-base text-emerald-900">{location.name}</h3>
          <p className="text-sm text-stone-600 mt-1">{location.description}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs rounded-full font-medium">
              {location.category}
            </span>
            <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
              location.visited
                ? 'bg-green-100 text-green-800'
                : 'bg-stone-100 text-stone-500'
            }`}>
              {location.visited ? 'Käyty' : 'Ei käyty'}
            </span>
          </div>
          <div className="mt-2 text-xs text-stone-500 space-y-0.5">
            <p>{location.municipality}, {location.region}</p>
            <p>Käyntiaika: {new Date(location.visitDate).toLocaleDateString('fi-FI')}</p>
          </div>
          <a
            href={location.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-xs text-emerald-700 hover:text-emerald-900 underline"
          >
            Lisätietoja &rarr;
          </a>
        </div>
      </Popup>
    </Marker>
  );
}
