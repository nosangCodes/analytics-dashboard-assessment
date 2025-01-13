import { useEffect, useState } from "react";
import fetchOverviewData from "../lib/fetch-overview-data";

export default function Overview() {
  const [overviews, setOverviews] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOverviewData();
        setOverviews(data);
      } catch (error) {
        console.error("error fetching overviewdata", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-semibold text-neutral-600">Overview</h2>
      <div className="flex flex-col md:flex-row gap-2 min-h-[100px]">
        {overviews.map((item, index) => (
          <OverviewCard key={index} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  );
}

function OverviewCard({ label, value }) {
  return (
    <div className="w-full md:w-[200px] group hover:bg-indigo-700/70 cursor-pointer shadow-md px-3 py-4 rounded-md bg-white transition-colors">
      <h4 className="text-sm md:text-base group-hover:text-white text-neutral-800">
        {label}
      </h4>
      <p className="text-lg md:text-2xl font-semibold group-hover:text-white text-indigo-700">
        {value}
      </p>
    </div>
  );
}
