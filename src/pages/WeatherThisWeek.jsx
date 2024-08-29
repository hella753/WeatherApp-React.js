import AppNav from "../components/AppNav/AppNav";
import PageNav from "../components/PageNav/PageNav";
import styles from "./WeatherThisWeek.module.css";
import WeekList from "../components/WeekApp/WeekList";
function WeatherThisWeek() {
  return (
    <div className={styles.app}>
      <PageNav />
      <div style={{ display: "flex" }}>
        <AppNav isToday={false} />
        <WeekList />
      </div>
    </div>
  );
}

export default WeatherThisWeek;
