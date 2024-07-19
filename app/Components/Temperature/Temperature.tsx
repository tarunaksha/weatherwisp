"use client";

import { useGlobalContext } from "@/app/context/globalContext";
import {
  clearSky,
  cloudy,
  drizzleIcon,
  rain,
  snow,
  thunderStorm,
} from "@/app/utils/Icons";
import { kelvinToCelsius } from "@/app/utils/misc";
import { useState } from "react";

function Temperature() {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast.weather) return <div>Loading...</div>;

  const { main, timezone, name, weather } = forecast;
  

  const temp = kelvinToCelsius(main?.temp);
  const feelsLike = kelvinToCelsius(main?.feels_like);
  const minTemp = kelvinToCelsius(main?.temp_min);
  const maxTemp = kelvinToCelsius(main?.temp_max);
  const humidity = main?.humidity;

  //State
  const [localTime, setLocalTime] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");


  const { main: weatherMain, description } = weather[0];
 

  const getIcon = () => {
    switch (weatherMain) {
      case "Drizzle":
        return drizzleIcon;
      case "Rain":
        return rain;
      case "Clear":
        return clearSky;
      case "Snow":
        return snow;
      case "Clouds":
        return cloudy;
      case "Thunderstorm":
        return thunderStorm;
      default:
        return clearSky;
    }
  };

  return (
    <div className="pt-6 pb-5 border rounded-lg flex flex-col justify-between dark:bg-dark-grey shadow-sm dark:shadow-none ">
      <p className="flex justify-between items-center">
        <span className="font-medium">{currentDay}</span>
        <span className="font-medium">{localTime}</span>
      </p>
    </div>
  );
}

export default Temperature;
