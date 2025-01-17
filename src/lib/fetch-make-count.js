import fetchEvData from "./fetch-ev-data";

const fetchMakeCount = async (year) => {
  try {
    const evData = await fetchEvData("/ev-data.csv");
    const makeCount = evData.reduce((count, ev) => {
      if (parseInt(ev["Model Year"]) === year) {
        count[ev["Make"]] = (count[ev["Make"]] || 0) + 1;
      }
      return count;
    }, {});

    const result = [];

    Object.entries(makeCount).map((entry) => {
      result.push({
        label: entry[0],
        value: entry[1],
      });
    });
    return result;
  } catch (error) {
    console.error("error getting make count");
    throw error;
  }
};

export default fetchMakeCount;
