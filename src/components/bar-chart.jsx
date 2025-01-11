import { BarChart as MuiBarChart } from "@mui/x-charts/BarChart";
import { formatNumber } from "../lib/utils";

const chartSetting = {
  xAxis: [
    {
      label: "Make count",
    },
  ],
  width: 650,
  height: 500,
  margin: { left: 130 },
};

export default function BarChart({ label, data }) {
  return (
    <div className="bg-white shadow-md rounded-md p-3 w-full flex flex-col">
      <h2 className="text-2xl font-semibold text-neutral-600">{label}</h2>
      <MuiBarChart
        dataset={data}
        yAxis={[
          {
            scaleType: "band",
            dataKey: "make",
            tickInterval: "auto",
          },
        ]}
        series={[{ dataKey: "count", valueFormatter: formatNumber }]}
        layout="horizontal"
        {...chartSetting}
        grid={{ vertical: true, horizontal: true }}
        sx={{}}
      />
    </div>
  );
}
