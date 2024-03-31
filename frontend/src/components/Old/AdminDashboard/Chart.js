import React, { useEffect, useRef, useState } from 'react';
import Chart, { transparentize } from 'chart.js/auto';
import { FormLabel } from 'react-bootstrap';
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdb-react-ui-kit";
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import { alpha } from '@material-ui/core/styles'
import "bootstrap/dist/css/bootstrap.css";

const MyChart = (props) => {
  const chartRef = useRef(null);
//   console.log("in charts : "+JSON.stringify(props.data));

  useEffect(() => {
    if (props.data && chartRef && chartRef.current) {
      const myChart = new Chart(chartRef.current, {
        type: props.type,
        data: {
         labels: Object.keys(props.data),
          datasets: [
            {
              label : props.legend,
              data: Object.values(props.data),
              backgroundColor: props.backgroundColor,
              borderColor: props.borderColor,
              borderWidth: 1,
              fill: true
            }
          ]
        },
        options: {
            plugins: {
                title: {
                  display: true,
                  text: props.label,
                }
              },
          scales: {
            y: {
                suggestedMax: Math.max(...Object.values(props.data)) + 2,
                suggestedMin: 0,
                ticks: {
                  precision: 0,
                },
            }
          }
        }
      });
      return () => {
        myChart.destroy();
      };
    }
  }, [props]);

  return (
    <div>
  {console.log(props.data)}
  <canvas ref={chartRef} />
  </div>
  );
};

export default MyChart;
