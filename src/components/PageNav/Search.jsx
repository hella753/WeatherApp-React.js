import { useWeather } from "../../hooks/useWeather";
import styles from "./Search.module.css";
import Button from "../../components/Button";
function Search() {
  const { location, handleLocationChange, handleSubmit } = useWeather();

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search from location"
        value={location}
        onChange={handleLocationChange}
        id="searchNav"
      />
      <Button>Search</Button>
    </form>
  );
}

export default Search;
