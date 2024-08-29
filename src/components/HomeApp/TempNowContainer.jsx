import styles from "./TempNowContainer.module.css";
import TempNow from "./TempNow";
import TempNowInfo from "./TempNowInfo";
function TempNowContainer() {
  return (
    <div className={styles.TempNowContainer}>
      <TempNow />
      <TempNowInfo />
    </div>
  );
}

export default TempNowContainer;
