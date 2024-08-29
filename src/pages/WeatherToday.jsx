import styles from "./WeatherToday.module.css";
import AppNav from "../components/AppNav/AppNav";
import PageNav from "../components/PageNav/PageNav";
import HourlyList from "../components/TodayApp/HourlyList";
function WeatherToday() {
  return (
    <div className={styles.app}>
      <PageNav />

      <div style={{ display: "flex" }}>
        <AppNav isToday={true} />
        <HourlyList />
      </div>
    </div>
  );
}

export default WeatherToday;
