import React, { useEffect, useState } from 'react';
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


const WeightLineChart = ({ weightEntries, weightUnit, goalWeight }) => {

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Load the saved theme from localStorage
        const savedMode = JSON.parse(localStorage.getItem("displayMode"));
        if (savedMode === "dark-mode") {
            document.body.setAttribute('data-theme', 'dark');
            setIsDarkMode(true);
        }
    }, [isDarkMode]);

    var getChartColors = (isDarkMode) => {
        return {
            weightColor: isDarkMode ? 'rgb(75, 192, 192)' : 'rgb(75, 192, 192)',
            goalWeightColor: isDarkMode ? 'rgb(255, 99, 132)' : 'rgb(255, 99, 132)',
            bmiColor: isDarkMode ? 'rgb(99, 255, 132)' : 'rgba(99, 255, 132)',
            gridColor: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgb(0, 0, 0, 0.3)',
            titleColor: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgb(0, 0, 0, 0.6)',
        };
    };

    const colors = getChartColors(isDarkMode);


    // Sort the weight entries by date before displaying them in the graph
    const sortedEntries = [...weightEntries].sort((a, b) => new Date(a.date) - new Date(b.date));
    const goalWeights = new Array(sortedEntries.length).fill(goalWeight);

    const data = {
        labels: sortedEntries.map(entry => entry.date),
        datasets: [
            {
                label: 'Weight',
                data: sortedEntries.map(entry => entry.weight),
                fill: false,
                backgroundColor: colors.weightColor,
                borderColor: colors.weightColor,
            },
            {
                label: 'Goal Weight',
                data: goalWeights,
                fill: false,
                backgroundColor: colors.goalWeightColor,
                borderColor: colors.goalWeightColor,
            },
            {
                label: 'BMI',
                data: sortedEntries.map(entry => entry.bmi),
                fill: false,
                backgroundColor: colors.bmiColor,
                borderColor: colors.bmiColor,
            },
        ],
    };
    
    const options = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: `Weight (${weightUnit})`,
                    color: colors.titleColor,
                },
                grid: {
                    color: colors.gridColor,
                },
                ticks: {
                    color: colors.titleColor, // Dynamically set based on display mode
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Date',
                    color: colors.titleColor,
                },
                grid: {
                    color: colors.gridColor,
                },
                ticks: {
                    color: colors.titleColor, // Dynamically set based on display mode
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: colors.titleColor,
                },
            },
            title: {
                display: true,
                text: 'Weight Graph',
                color: colors.titleColor,
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
