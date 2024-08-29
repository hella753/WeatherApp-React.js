import styles from "./Spinner.module.css";

function Spinner({ small }) {
  return (
    <div className={styles.spinnerContainer}>
      <div className={small ? styles.spinnerSmall : styles.spinner}></div>
    </div>
  );
}

export default Spinner;
