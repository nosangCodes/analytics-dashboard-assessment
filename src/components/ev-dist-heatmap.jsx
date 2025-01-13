import { Map, Marker } from "pigeon-maps";

export default function EvLocationMap({ codes }) {
  console.log("🚀 ~ EvLocationMap ~ codes:", codes);
  if (!codes?.[0]) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <Map height={600} defaultCenter={codes[0]} defaultZoom={5}>
        <Marker width={50} anchor={codes[0]} />
        {codes.map((code, index) => (
          <Marker key={index} width={50} anchor={code} />
        ))}
      </Map>
    </div>
  );
}
