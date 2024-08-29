import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";
import { useState } from "react";
function AppNav({ isToday }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <ul
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${isHovered ? styles.nav : styles.hideNav} ${
        isToday && styles.isToday
      }`}
    >
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/today">Weather Today</NavLink>
      </li>
      <li>
        <NavLink to="/week">Weather This Week</NavLink>
      </li>
    </ul>
  );
}

export default AppNav;
