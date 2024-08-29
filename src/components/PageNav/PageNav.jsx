import styles from "./PageNav.module.css";
import GeoCurrent from "./GeoCurrent";
import Search from "./Search";
import Converter from "./Converter";

function PageNav() {
  return (
    <div className={styles.PageNav}>
      <GeoCurrent />
      <Search />
      <Converter />
    </div>
  );
}

export default PageNav;
