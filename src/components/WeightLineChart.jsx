import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeightLineChart = ({ weightEntries, weightUnits, goalWeight }) => {
    // Sort the weight entries by date before displaying them in the graph
    const sortedEntries = [...weightEntries].sort((a, b) => new Date(a.date) - new Date(b.date));
    const goalWeights = new Array(sortedEntries.length).fill(goalWeight);

    const data = {
        labels: sortedEntries.map(entry => entry.date),
        datasets: [
            {
                label: 'Weight',
                data: weightEntries.map(entry => entry.weight),
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
            {
                label: 'Goal Weight',
                data: goalWeights,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: `Weight (${weightUnits})` ,
                },
            },
            x: {
                title: {
                    display: true,
                    text: `Date` ,
                },
            
            },
        },
        plugins: {
            title: {
                display: true,
                text: 'Weight Graph',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
    };

  return <Line data={data} options={options} />;
};

export default WeightLineChart;
