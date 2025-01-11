import Papa from "papaparse";

const fetchEvData = async (filePath) => {
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
