import styles from "./Homepage.module.css";
import TempNowContainer from "../components/HomeApp/TempNowContainer";
import PageNav from "../components/PageNav/PageNav";
import AppNav from "../components/AppNav/AppNav";
function Homepage() {
  return (
    <div className={styles.wholeApp}>
      <div className={styles.app}>
        <PageNav />
        <div className={styles.diva}>
          <AppNav isToday={false} className={styles.appNav} />
          <TempNowContainer />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
