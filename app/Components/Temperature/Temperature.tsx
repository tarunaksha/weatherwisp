"use client";

import { useGlobalContext } from "@/app/context/globalContext";
import {
  clearSky,
  cloudy,
  drizzleIcon,
  haze,
  navigation,
  rain,
  snow,
  thunderStorm,
} from "@/app/utils/Icons";
import { kelvinToCelsius } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";
import moment from "moment";
import { useEffect, useState } from "react";

function Temperature() {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast.weather)
    return <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-4" />;

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
      case "Haze":
        return haze;
      default:
        return clearSky;
    }
  };

  // live time
  useEffect(() => {
    // update time every second
    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(timezone / 60);
      // 24 hour format
      const formattedTime = localMoment.format("HH:mm:ss");
      // day of the week
      const day = localMoment.format("dddd");
      setLocalTime(formattedTime);
      setCurrentDay(day);
    }, 1000);
  }, []);

  return (
    <div className="pt-6 pb-5 px-4 border rounded-lg flex flex-col justify-between dark:bg-dark-grey shadow-sm dark:shadow-none ">
      <p className="flex justify-between items-center">
        <span className="font-medium">{currentDay}</span>
        <span className="font-medium">{localTime}</span>
      </p>
      <p className="pt-2 font-bold flex gap-1 ">
        <span className="">{name}</span>
        <span className="">{navigation}</span>
      </p>
      <p className="py-10 text-9xl font-bold self-center">{temp}°</p>
      <div>
        <div>
          <span>{getIcon()}</span>
          <p className="pt-2 capitalize text-lg font-medium">{description}</p>
        </div>
        <p className="flex items-center gap-2">
          <span>Low: {minTemp}°</span>
          <span>High: {maxTemp}°</span>
        </p>
      </div>
    </div>
  );
}

export default Temperature;
