import { useEffect, useState, useTransition } from "react";
import { fetchCities, fetchEvLocations } from "../lib/fetch-ev-data";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import EvsHeatMap from "../components/evs-heat-map";

export default function Geographic() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [geoCodes, setGeoCodes] = useState([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const getCities = async () => {
      const result = await fetchCities();
      setSelectedCity(result[0]);
      setCities(result);
    };

    getCities();
  }, []);

  useEffect(() => {
    const getEvLocations = async () => {
      const result = await fetchEvLocations(selectedCity);
      startTransition(() => {
        setGeoCodes(result);
      });
    };

    getEvLocations();
  }, [selectedCity]);

  return (
    <div className="p-3">
      <div className="flex flex-col gap-y-2 md:flex-row mb-3 justify-between">
        <h2 className="text-lg md:text-2xl text-neutral-700 font-semibold">
          Evs HeatMap
        </h2>
        <FormControl className="">
          <InputLabel className="text-sm" id="demo-simple-select-label">
            Select City
          </InputLabel>
          <Select
            className="min-w-[140px]"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCity}
            label="Filter by City"
            onChange={(e) => setSelectedCity(e.target.value)}
            size="small"
          >
            {cities &&
              cities.map((city) => (
                <MenuItem className="text-sm" key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
      <EvsHeatMap
        loading={isPending}
        selectedCity={selectedCity}
        codes={geoCodes}
      />
    </div>
  );
}
