import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import GaugeChart from "react-gauge-chart";

const RatingMeter = (props) => {
  let rating = props.rating;
  // const [rating, setRating] = useState(0.6);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setRating(0.67);
  //   }, 10000);

  //   setTimeout(() => {
  //     setRating(0.98);
  //   }, 20000);
  // });
 
  return (
    <GaugeChart
      id={`uph-chart`}
      nrOfLevels={8}
      percent={rating}
      hideText
      colors={["green", "red", "black", "red"]}
    />
  );
};

export default RatingMeter;
