import { LineChart as MuiLineChart } from "@mui/x-charts/LineChart";
import { formatNumber } from "../lib/utils";

export default function LineChart({ label, data }) {
  return (
    <div className="shadow-md bg-white rounded-md p-3">
      <h2 className="text-2xl font-semibold text-neutral-600">{label}</h2>
      <MuiLineChart
        dataset={data}
        xAxis={[{ dataKey: "x", valueFormatter: (value) => `${value}` }]}
        series={[
          {
            dataKey: "y",
            valueFormatter: formatNumber,
          },
        ]}
        height={500}
        grid={{ vertical: true, horizontal: true }}
      />
    </div>
  );
}
