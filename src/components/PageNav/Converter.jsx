import styles from "./Converter.module.css";
import { useWeather } from "../../hooks/useWeather";
function Converter() {
  const { weather, dispatch, weatherUnit, weatherCode } = useWeather();

  const CELSIUS =
    weather.current !== undefined
      ? Math.round(weather.current.temperature_2m)
      : 0;
  const FAHRENHEIT =
    weather.current !== undefined ? Math.round((CELSIUS * 9) / 5 + 32) : 0;
  const KILOMETERS =
    weather.current !== undefined
      ? Math.round(weather.current.wind_speed_10m)
      : 0;
  const MILES =
    weather.current !== undefined ? Math.round(KILOMETERS * 0.621371) : 0;

  function handleClick() {
    if (weatherUnit === "celsius") {
      dispatch({
        type: "weather/update",
        payload: {
          weather: weather,
          weatherCode: weatherCode,
          temp: `${FAHRENHEIT}F°`,
          wind: `${MILES}mph`,
          windUnit: "miles",
          weatherUnit: `fahrenheit`,
        },
      });
    } else {
      dispatch({
        type: "weather/update",
        payload: {
          weather: weather,
          weatherCode: weatherCode,
          wind: `${KILOMETERS}km/h`,
          temp: `${CELSIUS}C°`,
          windUnit: "kilometers",
          weatherUnit: `celsius`,
        },
      });
    }
  }
  return (
    <div>
      CONVERT UNITS C/F km/m{" "}
      <button className={styles.btn} onClick={handleClick}>
        Convert
      </button>
    </div>
  );
}

export default Converter;
