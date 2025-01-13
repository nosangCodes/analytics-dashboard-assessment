import { BarChart as MuiBarChart } from "@mui/x-charts/BarChart";
import { formatNumber } from "../lib/utils";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const chartSetting = {
  xAxis: [
    {
      label: "Count",
    },
  ],
  width: 650,
  height: 500,
  margin: { left: 130 },
};

const years = [
  2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012,
  2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000,
];

export default function BarChart({ label, data, setFilterYear, filterYear }) {
  return (
    <div className="bg-white shadow-md rounded-md p-3 w-full flex flex-col">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-semibold text-neutral-600">{label}</h2>
        {filterYear && (
          <FormControl className="">
            <InputLabel className="text-sm" id="demo-simple-select-label">
              Select Year
            </InputLabel>
            <Select
              className="min-w-[140px]"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filterYear}
              label="Select Year"
              onChange={(e) => setFilterYear(e.target.value)}
              size="small"
            >
              {years.map((year) => (
                <MenuItem className="text-sm" key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </div>
      <MuiBarChart
        dataset={data}
        yAxis={[
          {
            scaleType: "band",
            dataKey: "label",
            tickInterval: "auto",
          },
        ]}
        series={[{ dataKey: "value", valueFormatter: formatNumber }]}
        layout="horizontal"
        {...chartSetting}
        grid={{ vertical: true, horizontal: true }}
        sx={{}}
      />
    </div>
  );
}
