import { createContext, useCallback, useEffect, useReducer } from "react";
import image1 from "/src/images/sun.png";
import image2 from "/src/images/cloudy_sunny.png";
import image3 from "/src/images/cloudy.png";
import image4 from "/src/images/fog.png";
import image5 from "/src/images/cloudy_rainy.png";
import image6 from "/src/images/rainy.png";
import image7 from "/src/images/snow.png";
import image8 from "/src/images/storm.png";
import image9 from "/src/images/hail.png";

export const WeatherContext = createContext();

const initialState = {
  location: "",
  isLoading: false,
  displayLocation: "",
  weather: {},
  finalLocation: "",
  weatherUnit: "celsius",
  windUnit: "kilometers",
  temp: "",
  wind: "",
  error: "",
  weatherCode: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "weather/update":
      return {
        ...state,
        isLoading: false,
        temp: action.payload.temp,
        wind: action.payload.wind,
        weather: action.payload.weather,
        weatherCode: action.payload.weatherCode,
        windUnit: action.payload.windUnit,
        weatherUnit: action.payload.weatherUnit,
      };
    case "city/loaded":
      return { ...state, isLoading: false, displayLocation: action.payload };

    case "weather/code":
      return {
        ...state,
        isLoading: false,
        weatherCode: action.payload,
      };
    case "weather/unit":
      return {
        ...state,
        isLoading: false,
        weatherUnit: action.payload,
      };

    case "location/loadedfromstorage":
      return {
        ...state,
        isLoading: false,
        location: action.payload,
      };

    case "weather/reseted":
      return {
        ...state,
        isLoading: false,
      };
    case "location/changed":
      return {
        ...state,
        isLoading: false,
        location: action.payload,
      };
    case "finalLocation/submited":
      return {
        ...state,
        isLoading: false,
        finalLocation: action.payload,
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}

function WeatherProvider({ children }) {
  const [
    {
      location,
      isLoading,
      displayLocation,
      weather,
      finalLocation,
      weatherUnit,
      windUnit,
      temp,
      wind,
      weatherCode,
      error,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  function getImg(wmoCode) {
    const imgMap = new Map([
      [[0], image1],
      [[1], image2],
      [[2], image2],
      [[3], image3],
      [[45, 48], image4],
      [[51, 56, 61, 66, 80], image5],
      [[53, 55, 63, 65, 57, 67, 81, 82], image6],
      [[71, 73, 75, 77, 85, 86], image7],
      [[95], image8],
      [[96, 99], image9],
    ]);
    const arr = [...imgMap.keys()].find((key) => key.includes(wmoCode));
    if (!arr) return "NOT FOUND";
    return imgMap.get(arr);
  }

  const fetchWeather = useCallback(async () => {
    dispatch({ type: "loading" });
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${finalLocation}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, name, country, timezone } =
        geoData.results.at(0);
      dispatch({
        type: "city/loaded",
        payload: (
          <>
            <li>City: {name} </li> <li>Country: {country} </li>
          </>
        ),
      });

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min,wind_speed_10m_max&current=temperature_2m,wind_speed_10m,weather_code&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
      );
      const weatherData = await weatherRes.json();
      const { weather_code } = weatherData.current;

      dispatch({
        type: "weather/update",
        payload: {
          weather: weatherData,
          temp: `${Math.round(weatherData.current.temperature_2m)}C°`,
          wind: `${Math.round(weatherData.current.wind_speed_10m)}km/h`,
          windUnit: "kilometers",
          weatherUnit: "celsius",
          weatherCode: weather_code,
        },
      });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading the weather...",
      });
    }
  }, [finalLocation]);
  useEffect(() => {
    dispatch({
      type: "location/loadedfromstorage",
      payload: localStorage.getItem("location") || "",
    });
  }, []);

  useEffect(() => {
    if (finalLocation.length >= 2) {
      fetchWeather();
      localStorage.setItem("location", finalLocation);
    } else {
      dispatch({
        type: "weather/reseted",
        payload: {},
      });
    }
  }, [finalLocation, fetchWeather]);

  const handleLocationChange = (e) =>
    dispatch({ type: "location/changed", payload: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "finalLocation/submited", payload: location });
  };

  return (
    <WeatherContext.Provider
      value={{
        location,
        error,
        handleLocationChange,
        isLoading,
        displayLocation,
        finalLocation,
        handleSubmit,
        weather,
        temp,
        weatherUnit,
        wind,
        windUnit,
        getImg,
        weatherCode,
        dispatch,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export { WeatherProvider };
