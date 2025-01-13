import { useEffect, useState } from "react";
import { fetchTrendsData } from "../lib/fetch-ev-data";
import fetchMakeCount from "../lib/fetch-make-count";
import Overview from "../components/overview";
import LineChart from "../components/line-chart";
import BarChart from "../components/bar-chart";
import ScatterChart from "../components/scatter-chart";
import PieChart from "../components/pie-chart";

export default function Dash() {
  const [makeCount, setMakeCount] = useState([]);
  const [priceRange, setPriceRange] = useState([]);
  const [evTypes, setEvTypes] = useState([]);
  const [productionByYear, setProductionByYear] = useState([]);
  const [popularityYear, setPopularityYear] = useState(
    new Date().getFullYear() - 1
  );
  const [evsByCounty, setEvsByCounty] = useState([]);

  useEffect(() => {
    const getTrendsData = async () => {
      try {
        const res = await fetchTrendsData();
        setEvTypes(res?.evTypeCount);
        setPriceRange(res?.priceRange);
        setProductionByYear(res?.evsByProductionYear);
        setEvsByCounty(res?.evsByCounty);
      } catch (error) {
        console.error(error);
      }
    };

    getTrendsData();

    return () => {};
  }, []);

  useEffect(() => {
    const getMakeCount = async () => {
      try {
        const res = await fetchMakeCount(popularityYear);
        setMakeCount(res);
      } catch (error) {
        console.error(error);
      }
    };
    getMakeCount();
  }, [popularityYear]);

  return (
    <main className="px-4 py-2">
      <Overview />
      <div className="grid overflow-x-scroll lg:grid-cols-2 gap-4 mb-4 mt-3">
        <LineChart label={"Growth of EV Adoption"} data={productionByYear} />
        <BarChart
          filterYear={popularityYear}
          setFilterYear={setPopularityYear}
          label={"Popularity by Manufacturer"}
          data={makeCount}
        />
        <BarChart label={"Evs by County"} data={evsByCounty} />
        <ScatterChart label={"Price vs. Range Analysis"} data={priceRange} />
        <PieChart label={"Electric Vehicle Type"} data={evTypes} />
      </div>
    </main>
  );
}
