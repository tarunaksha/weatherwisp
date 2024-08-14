"use client";

import axios from "axios";
import React, { createContext, useEffect, useContext, useState } from "react";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState({});
  const [airQuality, setAirQuality] = useState({});
  const [fiveDayForecast, setFiveDayForecast] = useState({});
  const [uvIndex, setUvIndex] = useState({});

  const fetchForecast = async () => {
    try {
      const response = await axios.get("api/weather");
      setForecast(response.data);
    } catch (error) {
      console.log("Error fetching forecast data");
    }
  };

  const fetchAirQuality = async () => {
    try {
      const response = await axios.get("api/pollution");
      setAirQuality(response.data);
    } catch (error) {
      console.log("Error fetching air quality data");
    }
  };

  const fetchFiveDayForecast = async () => {
    try {
      const response = await axios.get("api/fiveday");
      setFiveDayForecast(response.data);
    } catch (error) {
      console.log("Error fetching five day forecast data");
    }
  };

  const fetchUvIndex = async () => {
    try {
      const response = await axios.get("api/uv");
      setUvIndex(response.data);
    } catch (error) {
      console.log("Error fetching UV index data");
    }
  }
  
  useEffect(() => {
    fetchForecast();
    fetchAirQuality();
    fetchFiveDayForecast();
    fetchUvIndex();
  }, []);
  
  
  return (
    <GlobalContext.Provider value={{forecast, airQuality, fiveDayForecast, uvIndex}}>
      <GlobalContextUpdate.Provider>{children}</GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
