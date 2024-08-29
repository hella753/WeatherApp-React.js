import styles from "./HourlyItem.module.css";
import { useWeather } from "../../hooks/useWeather";

function formatTime(dateStr) {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(dateStr));
}
function HourlyItem({
  temperature,
  time,
  windSpeed,
  relativeHumidity,
  weatherCode,
}) {
  const { getImg } = useWeather();
  return (
    <li className="item">
      <div>
        <img className={styles.img} src={getImg(weatherCode)} />
      </div>
      <div>Temperature: {temperature}C°</div>
      <div>Time: {formatTime(time)}</div>
      <div>Wind Speed: {windSpeed}km/h</div>
      <div>Relative Humidity: {relativeHumidity}</div>
    </li>
  );
}

export default HourlyItem;
