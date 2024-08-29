import styles from "./HourlyList.module.css";
import HourlyItem from "./HourlyItem";
import { useWeather } from "../../hooks/useWeather";

function HourlyList() {
  const { weather } = useWeather();

  if (weather.hourly) {
    const {
      relative_humidity_2m,
      temperature_2m,
      time,
      wind_speed_10m,
      weather_code,
    } = weather.hourly;

    const mappedData = time.slice(0, 24).map((_, index) => ({
      time: time[index],
      relativeHumidity: relative_humidity_2m[index],
      temperature: temperature_2m[index],
      windSpeed: wind_speed_10m[index],
      weatherCode: weather_code[index],
    }));

    return (
      <ul className={styles.hourlyList}>
        {mappedData.map(function (el, i) {
          return (
            <HourlyItem
              key={i}
              time={el.time}
              temperature={el.temperature}
              windSpeed={el.windSpeed}
              weatherCode={el.weatherCode}
              relativeHumidity={el.relativeHumidity}
            />
          );
        })}
      </ul>
    );
  }
}

export default HourlyList;
