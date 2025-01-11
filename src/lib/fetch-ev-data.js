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
  };
}

export async function fetchEvTypeCount() {
  const evData = await fetchEvData();
  const result = {};

  if (evData && evData.length > 0) {
    evData.forEach((item) => {
      result[item["Electric Vehicle Type"]] =
        (result[item["Electric Vehicle Type"]] || 0) + 1;
    });
  }

  return Object.entries(result).map((item) => ({
    label: item?.[0],
    value: parseInt(item?.[1]),
  }));
}

export async function evsProductionByYear() {
  const evData = await fetchEvData();
  const result = {};

  if (evData && evData.length > 0) {
    evData.forEach((item) => {
      result[item["Electric Vehicle Type"]] =
        (result[item["Electric Vehicle Type"]] || 0) + 1;
    });
  }

  return Object.entries(result).map((item) => ({
    label: item?.[0],
    value: parseInt(item?.[1]),
  }));
}
