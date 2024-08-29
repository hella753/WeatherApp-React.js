import styles from "./WeekList.module.css";
import { useWeather } from "../../hooks/useWeather";
import WeekItem from "./WeekItem";

function WeekList() {
  const { weather, getImg } = useWeather();

  if (weather.daily) {
    const {
      temperature_2m_max,
      temperature_2m_min,
      time,
      wind_speed_10m_max,
      weathercode,
    } = weather.daily;

    const mappedData = time.slice(0, 7).map((_, index) => ({
      time: time[index],
      temperatureMax: temperature_2m_max[index],
      temperatureMin: temperature_2m_min[index],
      windSpeed: wind_speed_10m_max[index],
      weatherCode: weathercode[index],
    }));

    return (
      <div>
        <div className={styles.item}>
          <div>
            <img className={styles.img} src={getImg(weathercode[0])} />
          </div>
          <div>Today</div>
          <div>
            Temperature: {temperature_2m_min[0]}C°-{temperature_2m_max[0]}C°
          </div>
          <div>Maximum Wind Speed: {wind_speed_10m_max[0]}km/h</div>
        </div>
        <ul className={styles.weekList}>
          {mappedData.map(function (el, i) {
            if (i != 0)
              return (
                <WeekItem
                  key={i}
                  time={el.time}
                  temperatureMax={el.temperatureMax}
                  windSpeed={el.windSpeed}
                  weatherCode={el.weatherCode}
                  temperatureMin={el.temperatureMin}
                />
              );
          })}
        </ul>
      </div>
    );
  }
}

export default WeekList;
