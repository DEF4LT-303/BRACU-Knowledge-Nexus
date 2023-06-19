import React from "react";
import { useTheme } from "@material-ui/core/styles";
import moment from "moment";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function useOptions(theme, data) {
  return {
    chart: {
      height: "250px",
      type: "spline",
    },
    xAxis: {
      type: "datetime",
    },
    yAxis: {
      labels: {
        format: "${value}",
      },
    },
    title: null,
    series: [
      {
        name: "Revenue",
        data,
        color: theme.palette.primary.main,
      },
    ],
    plotOptions: {
      series: {
        marker: {
          enabled: false,
        },
      },
    },
  };
}

export default function RevenueLine() {
  const theme = useTheme();
  const chartData = [
    { date: new Date(), fare: 1000 },
    { date: moment(new Date()).add(1, "day").valueOf(), fare: 300 },
    { date: moment(new Date()).add(2, "day").valueOf(), fare: 800 },
    { date: moment(new Date()).add(3, "day").valueOf(), fare: 400 },
    { date: moment(new Date()).add(4, "day").valueOf(), fare: 1300 },
    { date: moment(new Date()).add(5, "day").valueOf(), fare: 2300 },
    { date: moment(new Date()).add(6, "day").valueOf(), fare: 1900 },
  ].filter(({ date }) => date);
  const mapped = chartData.map(({ fare, date }) => [
    moment(date).valueOf(),
    fare,
  ]);
  const options = useOptions(theme, mapped);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
