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
  plugins: {
    legend: {
      position: "top",
      align: "start",

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
        text: "classes",
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
      }
    }
  }
};




export default function Barchart({ option = {}, labelsdata, styling }) {

  return (
    <Bar options={{ ...defaultOptions, ...option }} data={labelsdata} style={styling} />
  );
}

