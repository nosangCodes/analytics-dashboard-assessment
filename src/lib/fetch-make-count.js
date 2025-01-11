import fetchEvData from "./fetch-ev-data";

const fetchMakeCount = async () => {
  try {
    const evData = await fetchEvData("/ev-data.csv");
    const makeCount = evData.reduce((count, ev) => {
      count[ev["Make"]] = (count[ev["Make"]] || 0) + 1;
      return count;
    }, {});

    const result = [];

    Object.entries(makeCount).map((entry) => {
      result.push({
        make: entry[0],
        count: entry[1],
      });
    });
    return result;
  } catch (error) {
    console.error("error getting make count");
    throw error;
  }
};

export default fetchMakeCount;
