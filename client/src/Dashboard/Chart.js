import React, { useContext } from "react";
import { useTheme } from "@material-ui/core/styles";
import { DataContext } from "../Providers/DataProvider";
import moment from "moment";
import Title from "./Title";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function useOptions(theme, data, secondData) {
  return {
    chart: {
      height: "250px",
      type: "column",
    },
    xAxis: {
      type: "datetime",
    },

    title: null,
    series: [
      {
        name: "Deposits",
        data,
        color: theme.palette.primary.main,
      },
      {
        name: "Withdrawls",
        data: secondData,
        color: theme.palette.secondary.main,
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

export default function Chart() {
  const theme = useTheme();
  const { data } = useContext(DataContext);
  const chartData = Object.values(data)
    .map(({ amount, date }) => [date, amount])
    .sort((a, b) => {
      return moment(a[0]).isBefore(b[0]);
    });
  let income = chartData.filter(([date, amount]) => amount > 0);
  let expense = chartData.filter(([date, amount]) => amount < 0);
  const options = useOptions(theme, income, expense);
  return (
    <React.Fragment>
      <Title>Today</Title>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </React.Fragment>
  );
}
