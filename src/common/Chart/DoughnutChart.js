import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const radius = 80;

const image = new Image();
image.src = "/invoice.png";

const styling = { height: 215, maxWidth: 230 };

const option = {
  animation: false,
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

export default function DoughnutChart({ data, midNumberText, midTextFirst, midTextSecond, totalRemainng }) {
  return (
    <Doughnut
      data={{ ...data }}
      redraw={true}
      plugins={[{
        beforeDraw: function (chart) {
          var ctx = chart.ctx;
          ctx.restore();
          ctx.textBaseline = "top";
          ctx.font = '600 14px Rubik';
          ctx.fillText(midNumberText, radius + 20, radius + 20);
          ctx.font = '400 14px Rubik';
          ctx.fillstyle = '#00000066';
          ctx.fillText(midTextFirst, radius + 21, radius + 40);
          ctx.fillText(midTextSecond, radius + 5, radius + 60);
          ctx.fillText(totalRemainng, radius - 15, radius + 120);
          ctx.font = '500 18px Rubik';
          ctx.fillText('50', 100, 265);
          ctx.save();
          if (image.complete) {
            ctx.drawImage(image, 103, 67);
          } else {
            image.onload = () => chart.draw();
          }
        }
      }
      ]}
      style={styling}
      options={option}
    />);
}
