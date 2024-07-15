import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Line, Bar, Pie, Doughnut, Radar, PolarArea } from "react-chartjs-2";

// Register components globally
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const chartMapping = {
    line: Line,
    bar: Bar,
    pie: Pie,
    doughnut: Doughnut,
    radar: Radar,
    polarArea: PolarArea
};

const CommonChart = ({ chartType, data, options }) => {
    const Chart = chartMapping[chartType];

    return (
        <div className="p-4 bg-white rounded-sm shadow-md">
            <Chart data={data} options={options} />
        </div>
    );
};

export default CommonChart;
