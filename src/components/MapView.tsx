import { MapContainer, TileLayer } from 'react-leaflet';
import LocationMarker from './LocationMarker';
import LocateControl from './LocateControl';
import { LocationPoint } from '../types';

const DEFAULT_CENTER: [number, number] = [64.5, 26.0];
const DEFAULT_ZOOM = 5;

interface MapViewProps {
  locations: LocationPoint[];
}

export default function MapView({ locations }: MapViewProps) {
  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom={true}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location) => (
        <LocationMarker key={location.id} location={location} />
      ))}
      <LocateControl />
    </MapContainer>
  );
}
