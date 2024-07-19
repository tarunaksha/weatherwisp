"use client";

import axios from "axios";
import React, { createContext, useEffect, useContext, useState } from "react";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState({});

  const fetchForecast = async () => {
    try {
      const response = await axios.get("api/weather");
      setForecast(response.data);
    } catch (error) {
      console.log("Error fetching forecast data");
    }
  };
  
  useEffect(() => {
    fetchForecast();
  }, []);
  
  
  return (
    <GlobalContext.Provider value={{forecast}}>
      <GlobalContextUpdate.Provider>{children}</GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
