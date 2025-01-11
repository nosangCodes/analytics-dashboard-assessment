import fetchEvData from "./fetch-ev-data";
import { formatNumber } from "./utils";

function getTopMake(data) {
  const makeCount = data.reduce((count, ev) => {
    count[ev["Make"]] = (count[ev["Make"]] || 0) + 1;
    return count;
  }, {});

  let topMake = "";
  let maxCount = 0;

  for (const make in makeCount) {
    if (makeCount[make] > maxCount) {
      maxCount = makeCount[make];
      topMake = make;
    }
  }

  return { topMake, count: makeCount[topMake] };
}

const fetchOverviewData = async () => {
  try {
    const evData = await fetchEvData("/ev-data.csv");
    const evsRegistered = evData.length;
    const totalRange = evData.reduce(
      (sum, ev) => sum + parseInt(ev["Electric Range"]),
      0
    );
    // console.log("🚀 ~ fetchOverviewData ~ totalRange:", totalRange);
    const topMake = getTopMake(evData);

    const avgRange = totalRange / evsRegistered;

    return [
      {
        label: "Evs Registered",
        value: formatNumber(evsRegistered),
      },
      {
        label: "Avg Range",
        value: avgRange.toFixed(2) + "mi",
      },
      {
        label: "Top Make",
        value: topMake.topMake + "" + "(" + formatNumber(topMake.count) + ")",
      },
    ];
  } catch (error) {
    console.error("Error fetching overview data", error);
    throw error;
  }
};

export default fetchOverviewData;
