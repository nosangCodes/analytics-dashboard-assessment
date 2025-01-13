import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Icon } from "leaflet";

const HeatmapLayer = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const heatLayer = L.heatLayer(data, {
      radius: 30, // Adjust the radius of each point
      blur: 30, // Blurring effect
      maxZoom: 15, // Maximum zoom level
      gradient: {
        0.2: "blue",
        0.4: "lime",
        0.6: "yellow",
        0.8: "orange",
        1: "red",
      },
    });

    heatLayer.addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [data, map]);

  return null;
};

const RecenterAutomatically = ({ code }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(code, map.getZoom());
  }, [code, map]);
  return null;
};

export default function EvsHeatMap({ codes, selectedCity, loading }) {
  if (loading || !codes?.length) {
    return (
      <div className="min-h-[36rem] w-full bg-neutral-700/50 flex justify-center items-center animate-pulse">
        <Loader2 className="animate-spin size-7" />
      </div>
    );
  }

  return (
    <div className="h-[37rem] w-full">
      <MapContainer center={codes[0]} zoom={10} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          icon={
            new Icon({
              iconUrl:
                "https://img.icons8.com/ios-filled/50/03C937/flag--v1.png",
              iconSize: [35, 35],
              iconAnchor: [17, 46],
              popupAnchor: [-3, -76],
            })
          }
          position={codes[0]}
        >
          <Popup>{selectedCity}</Popup>
        </Marker>
        <HeatmapLayer data={codes} />
        <RecenterAutomatically code={codes[0]} />
      </MapContainer>
    </div>
  );
}
