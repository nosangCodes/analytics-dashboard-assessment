import { PieChart as MuiPieChart } from "@mui/x-charts/PieChart";

export default function PieChart({ label, data }) {
  return (
    <div className="bg-white shadow-md rounded-md p-3 w-fit flex flex-col">
      <h2 className="text-2xl font-semibold text-neutral-600">{label}</h2>
      <MuiPieChart
        viewBox={{
          height: 400,
          width: 300,
        }}
        series={[
          {
            data: data,
            innerRadius: 24,
            cornerRadius: 10,
          },
        ]}
        width={400}
        height={400}
        slotProps={{
          legend: { hidden: true },
        }}
      />
    </div>
  );
}
