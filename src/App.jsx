import { useEffect, useState } from "react";
import "./App.css";
// import fetchEvData from "./lib/fetch-ev-data";
import Overview from "./components/overview";
import PieChart from "./components/pie-chart";
import fetchMakeCount from "./lib/fetch-make-count";

function App() {
  const [makeCount, setMakeCount] = useState([]);
  // const [jsonData, setJsonData] = useState([]);

  // useEffect(() => {
  //   const fetchAndParseCsv = async () => {
  //     try {
  //       const data = await fetchEvData("/ev-data.csv"); // Path relative to `public` folder
  //       console.log("🚀 ~ fetchAndParseCsv ~ data:", data);
  //       setJsonData(data);
  //     } catch (error) {
  //       console.error("Error loading CSV:", error);
  //     }
  //   };

  //   // fetchAndParseCsv();
  // }, []);

  useEffect(() => {
    const getMakeCount = async () => {
      try {
        const res = await fetchMakeCount();
        setMakeCount(res);
      } catch (error) {
        console.error(error);
      }
    };

    getMakeCount();

    return () => {};
  }, []);
  console.log("🚀 ~ App ~ makeCount:", makeCount);

  return (
    <main className="px-4 py-2">
      <Overview />
      <div className="grid gap-3 mt-3">
        <PieChart label={"Popularity by Manufacturer"} data={makeCount} />
      </div>
    </main>
  );
}

export default App;
