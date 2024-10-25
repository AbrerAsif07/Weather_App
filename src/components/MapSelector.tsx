import React from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet';
import { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';

interface MapSelectorProps {
  coords: { lat: number; lon: number };
  onLocationSelect: (lat: number, lon: number) => void;
}

function LocationMarker({ position, onLocationSelect }: { 
  position: [number, number]; 
  onLocationSelect: (lat: number, lon: number) => void;
}) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return <Marker position={position} />;
}

export function MapSelector({ coords, onLocationSelect }: MapSelectorProps) {
  // Fix Leaflet default marker icon issue in React
  React.useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-6 h-6 text-white" />
        <h2 className="text-2xl font-bold text-white">Select Location on Map</h2>
      </div>
      <div className="h-[400px] rounded-lg overflow-hidden">
        <MapContainer
          center={[coords.lat, coords.lon]}
          zoom={13}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker 
            position={[coords.lat, coords.lon]}
            onLocationSelect={onLocationSelect}
          />
        </MapContainer>
      </div>
      <p className="text-white/70 text-sm mt-2">
        Click anywhere on the map to select a location
      </p>
    </div>
  );
}