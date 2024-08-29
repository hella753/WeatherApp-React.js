import { useWeather } from "../../hooks/useWeather";
import styles from "./TempNowInfo.module.css";
import Spinner from "../Spinner";
function TempNowInfo() {
  const { weather, displayLocation, temp, wind } = useWeather();
  if (weather.current !== undefined)
    return (
      <div className={styles.tempNowInfo}>
        <ul>
          {weather.current.temperature_2m ? (
            <div>
              {displayLocation}
              <li>Temperature: {temp}</li>
              <li>Wind Speed: {wind}</li>
            </div>
          ) : (
            <Spinner small={false} />
          )}
        </ul>
      </div>
    );
  return (
    <div className={styles.tempNowInfo}>
      Use the Search Field or GeoLocation
    </div>
  );
}

export default TempNowInfo;
