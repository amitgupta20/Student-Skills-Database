
import GaugeChart from "react-gauge-chart";

const RatingMeter = (props) => {
  let rating = props.rating || 0;
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
      nrOfLevels={props.levels}
      percent={props.rating}
      hideText
      colors={props.colors}
    />
  );
};

export default RatingMeter;
