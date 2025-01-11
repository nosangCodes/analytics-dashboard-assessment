import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ScatterChart as MuiScatterChart } from "@mui/x-charts/ScatterChart";
import { useEffect, useState } from "react";

export default function ScatterChart({ label, data }) {
  const [selectedMake, setSelectedMake] = useState("");

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      const firstItem = Object.keys(data)?.[0];
      setSelectedMake(firstItem);
    }
  }, [data]);

  const chartSetting = {
    xAxis: [
      {
        label: "Price",
      },
    ],
    yAxis: [
      {
        label: "Range",
      },
    ],
  };

  return (
    <div className="bg-white shadow-md rounded-md p-3 w-full flex flex-col">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-semibold text-neutral-600">{label}</h2>
        <FormControl className="">
          <InputLabel className="text-sm" id="demo-simple-select-label">
            Select Make
          </InputLabel>
          <Select
            className="min-w-[140px]"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedMake}
            label="Select Make"
            onChange={(e) => setSelectedMake(e.target.value)}
            size="small"
          >
            {data &&
              Object.entries(data).map(([key]) => (
                <MenuItem className="text-sm" key={key} value={key}>
                  {key}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
      {data && selectedMake && data[selectedMake]?.length > 0 ? (
        <MuiScatterChart
          width={650}
          height={500}
          series={[
            {
              data: data[selectedMake] ?? [],
            },
          ]}
          grid={{ vertical: true, horizontal: true }}
          {...chartSetting}
        />
      ) : (
        <p className="text-center text-gray-500 mt-4">
          No data available to display.
        </p>
      )}
    </div>
  );
}
