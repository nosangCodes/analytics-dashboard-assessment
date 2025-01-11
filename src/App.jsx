import { useEffect, useState } from "react";
import "./App.css";
// import fetchEvData from "./lib/fetch-ev-data";
import Overview from "./components/overview";
import PieChart from "./components/pie-chart";
import fetchMakeCount from "./lib/fetch-make-count";
import { fetchTrendsData } from "./lib/fetch-ev-data";
import ScatterChart from "./components/scatter-chart";
import BarChart from "./components/bar-chart";
import LineChart from "./components/line-chart";

function App() {
  const [makeCount, setMakeCount] = useState([]);
  const [priceRange, setPriceRange] = useState([]);
  const [evTypes, setEvTypes] = useState([]);
  const [productionByYear, setProductionByYear] = useState([]);

  useEffect(() => {
    const getMakeCount = async () => {
      try {
        const res = await fetchMakeCount();
        setMakeCount(res);
      } catch (error) {
        console.error(error);
      }
    };

    const getTrendsData = async () => {
      try {
        const res = await fetchTrendsData();
        console.log("🚀 ~ getTrendsData ~ res:", res);
        setEvTypes(res?.evTypeCount);
        setPriceRange(res?.priceRange);
        setProductionByYear(res?.evsByProductionYear);
      } catch (error) {
        console.error(error);
      }
    };

    getMakeCount();
    getTrendsData();

    return () => {};
  }, []);

  return (
    <main className="px-4 py-2">
      <Overview />
      <div className="grid lg:grid-cols-2 gap-4 mb-4 mt-3">
        <LineChart label={"Growth of EV Adoption"} data={productionByYear} />
        <BarChart label={"Popularity by Manufacturer"} data={makeCount} />
        <ScatterChart label={"Price vs. Range Analysis"} data={priceRange} />
        <PieChart label={"Electric Vehicle Type"} data={evTypes} />
      </div>
    </main>
  );
}

export default App;
