import styles from "./GeoCurrent.module.css";
import { useGeolocation } from "../../hooks/UseGeoLocation";
import { useEffect, useState } from "react";
import { useWeather } from "../../hooks/useWeather";
import Spinner from "../Spinner";

function GeoCurrent() {
  const { position, getPosition } = useGeolocation();
  const { dispatch } = useWeather();
  const [isLoading, setIsLoading] = useState(false);
  const [disp, setDisp] = useState(`Use GeoLocation`);
  const KEY = "463e237f66c64661bc494d3b007392d4";

  function handleClick() {
    getPosition();
  }

  useEffect(() => {
    async function reverseGeocoding() {
      setIsLoading(true);
      try {
        const geoRes = await fetch(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${position.lat}&lon=${position.lng}&format=json&apiKey=${KEY}`
        );
        const data = await geoRes.json();
        if (!data.results) throw new Error("Location not found");

        const { city, country } = data.results.at(0);
        dispatch({
          type: "city/loaded",
          payload: (
            <>
              <li>City: {city} </li> <li>Country: {country} </li>{" "}
            </>
          ),
        });
        setDisp(
          <>
            <li>City: {city} </li> <li>Country: {country} </li>{" "}
          </>
        );
        dispatch({ type: "finalLocation/submited", payload: city });
        dispatch({ type: "location/changed", payload: city });
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (position != null) reverseGeocoding();
  }, [position, dispatch]);

  if (isLoading) return <Spinner small={true} />;
  return (
    <div
      onClick={handleClick}
      className={`${
        disp === "Use GeoLocation" ? styles.geoCurrent : styles.geoCurrentHid
      } `}
    >
      {disp}
    </div>
  );
}

export default GeoCurrent;
