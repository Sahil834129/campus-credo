import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const radius = 80;
const defaultData = {
  datasets: [
    {
      data: [85, 15],
      backgroundColor: ["#41285F", "#EEF0F5"],
      borderRadius: 30,
      cutout: 90,
      radius: radius,
    }],
};

const image = new Image();
image.src = "/invoice.png";

const Plugins = [{
  beforeDraw: function (chart) {
    var ctx = chart.ctx;
    ctx.restore();
    ctx.textBaseline = "top";
    ctx.font = '600 14px Rubik';
    ctx.fillText('150', radius + 23, radius + 20);
    ctx.font = '400 14px Rubik';
    ctx.fillstyle = '#00000066';
    ctx.fillText('Offer', radius + 21, radius + 40);
    ctx.fillText('Accepted', radius + 5, radius + 60);
    ctx.fillText('Remaing Seats', radius + 5, radius + 120);
    ctx.font = '500 18px Rubik';
    ctx.fillText('50', 100, 265);
    ctx.save();
    if (image.complete) {
      ctx.drawImage(image, 103, 67);
    } else {
      image.onload = () => chart.draw();
    }
  },
}
];

const styling = { height: 215, maxWidth: 230 };

const option = {
  responsive: true,
  aspectRatio: 0,
  maintainAspectRatio: false,
  layout: {
    padding: 0,
    margin: 0
  },
  plugins: {
    legend: {
      display: true,
      position: "bottom",
    },
  }
};

export default function DoughnutChart({ data }) {
  const val = data;
  return <Doughnut data={{ ...defaultData, ...val }} plugins={Plugins} style={styling} options={option} />;
}
