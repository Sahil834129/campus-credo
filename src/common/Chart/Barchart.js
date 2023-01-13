import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  padding: 20,
  plugins: {
    legend: {
      position: "top",
      align: "start",
      labels: {
        boxWidth: 10,
        useBorderRadius: true,
        borderRadius: 6
      }
    },
    title: {
      display: false,
      text: "Class",

    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      title: {
        display: true,
        text: "Classes",
        color: "000000",
      }
    },
    y: {
      grid: {
        display: true
      },
      title: {
        display: true,
        text: "Sum of Applications Received",
        color: "000000",
      },
      grace: 1,
      ticks: {
        stepSize: 1,
      }
    }
  }
};


export default function Barchart({ option = {}, labelsdata, styling }) {

  return (
    <Bar options={{ ...defaultOptions, ...option }} data={labelsdata} style={styling} />
  );
}

