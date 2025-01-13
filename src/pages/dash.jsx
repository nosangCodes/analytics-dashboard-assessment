import { useEffect, useState, useTransition } from "react";
import { fetchTrendsData } from "../lib/fetch-ev-data";
import fetchMakeCount from "../lib/fetch-make-count";
import Overview from "../components/overview";
import LineChart from "../components/line-chart";
import BarChart from "../components/bar-chart";
import ScatterChart from "../components/scatter-chart";
import PieChart from "../components/pie-chart";
import { Loader2 } from "lucide-react";

export default function Dash() {
  const [makeCount, setMakeCount] = useState([]);
  const [priceRange, setPriceRange] = useState([]);
  const [evTypes, setEvTypes] = useState([]);
  const [productionByYear, setProductionByYear] = useState([]);
  const [popularityYear, setPopularityYear] = useState(
    new Date().getFullYear() - 1
  );
  const [evsByCounty, setEvsByCounty] = useState([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const getTrendsData = async () => {
      try {
        const res = await fetchTrendsData();
        startTransition(() => {
          setEvTypes(res?.evTypeCount);
          setPriceRange(res?.priceRange);
          setProductionByYear(res?.evsByProductionYear);
          setEvsByCounty(res?.evsByCounty);
        });
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
        startTransition(() => {
          setMakeCount(res);
        });
      } catch (error) {
        console.error(error);
      }
    };
    getMakeCount();
  }, [popularityYear]);

  return (
    <main className="px-4 py-2">
      <Overview />
      {!isPending ? (
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
      ) : (
        <div className="grid lg:grid-cols-2 mt-3 gap-4">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="h-[500px] rounded-md shadow-md w-full bg-neutral-700/40 animate-pulse flex justify-center items-center"
              >
                <Loader2 className="animate-spin size-7 text-white" />
              </div>
            ))}
        </div>
      )}
    </main>
  );
}
