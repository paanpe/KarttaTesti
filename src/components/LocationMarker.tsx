import { Marker, Popup } from 'react-leaflet';
import { LocationPoint } from '../types';

interface LocationMarkerProps {
  location: LocationPoint;
}

export default function LocationMarker({ location }: LocationMarkerProps) {
  return (
    <Marker position={location.position}>
      <Popup>
        <div className="p-1">
          <h3 className="font-bold text-lg">{location.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{location.description}</p>
          {location.category && (
            <span className="inline-block mt-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
              {location.category}
            </span>
          )}
        </div>
      </Popup>
    </Marker>
  );
}
