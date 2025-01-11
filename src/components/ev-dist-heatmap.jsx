import * as React from "react";
import Map from "react-map-gl";

export default function TestMap() {
  const [mapStyle, setMapStyle] = React.useState(null);

  return (
    <>
      <Map
        initialViewState={{
          latitude: 37.805,
          longitude: -122.447,
          zoom: 15.5,
        }}
        mapStyle={mapStyle && mapStyle.toJS()}
        styleDiffing
        mapboxAccessToken={MAPBOX_TOKEN}
      />

      <ControlPanel onChange={setMapStyle} />
    </>
  );
}
