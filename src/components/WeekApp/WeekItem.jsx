import { useWeather } from "../../hooks/useWeather";
import styles from "./WeekItem.module.css";
function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "long",
  }).format(new Date(dateStr));
}

function WeekItem({
  temperatureMin,
  time,
  windSpeed,
  temperatureMax,
  weatherCode,
}) {
  const { getImg } = useWeather();
  return (
    <li className="item">
      <div>
        <img className={styles.img} src={getImg(weatherCode)} />
      </div>
      <div>Day: {formatDay(time)}</div>
      <div>
        Temp {temperatureMin}C°-{temperatureMax}C°
      </div>
      <div>Max Wind Speed: {windSpeed}km/h</div>
    </li>
  );
}

export default WeekItem;
