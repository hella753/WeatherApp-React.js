import styles from "./TempNow.module.css";
import { useWeather } from "../../hooks/useWeather";
import Spinner from "../Spinner";
function TempNow() {
  const { getImg, weatherCode, isLoading } = useWeather();
  const imgPath = getImg(weatherCode);

  return (
    <div className={styles.tempNow}>
      {isLoading ? (
        <Spinner small={false} />
      ) : !isLoading && weatherCode === "" ? (
        <div></div>
      ) : (
        <img className={styles.img} src={imgPath} />
      )}
    </div>
  );
}

export default TempNow;
