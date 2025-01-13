import Papa from "papaparse";
import { v4 as uuidv4 } from "uuid";

const fetchEvData = async (filePath = "/ev-data.csv") => {
  try {
    const response = await fetch(filePath);
    const csvText = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true, // Treat the first row as column headers
        skipEmptyLines: true, // Skip empty lines
        complete: (result) => resolve(result.data),
        error: (error) => reject(error),
      });
    });
  } catch (error) {
    console.error("Error fetching or parsing CSV file:", error);
    throw error;
  }
};

export default fetchEvData;

export async function fetchTrendsData() {
  const evData = await fetchEvData();
  const priceRange = {};
  const evTypeCount = {};
  const evsByProductionYear = {};
  const evsByCounty = {};

  if (evData && evData?.length > 0) {
    evData.forEach((item) => {
      if (parseInt(item["Base MSRP"])) {
        if (item["Make"] in priceRange) {
          priceRange[item["Make"]].push({
            x: item["Base MSRP"],
            y: item["Electric Range"],
            id: uuidv4(),
          });
        } else {
          priceRange[item["Make"]] = [
            {
              x: item["Base MSRP"],
              y: item["Electric Range"],
              id: uuidv4(),
            },
          ];
        }
      }

      evTypeCount[item["Electric Vehicle Type"]] =
        (evTypeCount[item["Electric Vehicle Type"]] || 0) + 1;

      evsByProductionYear[item["Model Year"]] =
        (evsByProductionYear[item["Model Year"]] || 0) + 1;

      evsByCounty[item["County"]] = (evsByCounty[item["County"]] || 0) + 1;
    });
  }

  return {
    priceRange,
    evTypeCount: Object.entries(evTypeCount).map((item) => ({
      label: item?.[0],
      value: parseInt(item?.[1]),
    })),
    evsByProductionYear: Object.entries(evsByProductionYear).map((item) => ({
      x: item[0],
      y: item[1],
    })),
    evsByCounty: Object.entries(evsByCounty).map((item) => ({
      label: item[0],
      value: item[1],
    })),
  };
}

export async function fetchEvLocations(cityName) {
  const evData = await fetchEvData();
  const result = [];

  if (cityName && evData && evData.length > 0) {
    evData.forEach((item) => {
      if (item["City"] == cityName) {
        const geoCode = item["Vehicle Location"]
          .split("(")[1]
          .split(")")[0]
          .split(" ")
          .map((item) => parseFloat(item))
          .reverse();

        if (geoCode.length === 2) {
          result.push(geoCode);
        }
      }
    });
  }

  return result;
}

export async function fetchCities() {
  const evData = await fetchEvData();
  const cities = new Set();

  if (evData && evData.length > 0) {
    evData.forEach((item) => {
      cities.add(item["City"]);
    });
  }

  return [...cities];
}
