import {
  PieChart as MuiPieChart,
  pieArcLabelClasses,
} from "@mui/x-charts/PieChart";


export default function PieChart({ label, data }) {
  return (
    <div className="bg-white w-full shadow-md rounded-md p-3 flex flex-col">
      <h2 className="text-2xl font-semibold text-neutral-600">{label}</h2>
      <MuiPieChart
        // viewBox={{
        //   height: 400,
        //   width: 300,
        // }}
        series={[
          {
            arcLabel: (item) => item.label,
            arcLabelMinAngle: 35,
            arcLabelRadius: "60%",
            data: data,
            innerRadius: 24,
            cornerRadius: 10,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fontWeight: "bold",
            fontSize: 10,
          },
        }}
        width={650}
        height={400}
        slotProps={{
          legend: { hidden: true },
        }}
      />
    </div>
  );
}
