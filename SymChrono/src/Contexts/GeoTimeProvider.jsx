import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment-timezone";

const CalanderContext = React.createContext();

export const GeoTimeProvider = ({ children }) => {
  const [timestamp, setTimestamp] = useState();
  const [currentTime, setCurrentTime] = useState();
  const [region, setRegion] = useState();
  const [specificDate, setSpecificDate] = useState({});
  const [calanderDate, setCalanderDate] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Success callback: User granted permission
        const { latitude, longitude } = position.coords;
        const geodata = async () => {
          const getGeoData = await axios
            .get(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=12704fde85a043f29ab58bbc6e6b48be`
            )
            .then((res) => res.data);
          const resTimeStamp = getGeoData.timestamp.created_http;

          //this code below extracts the data form the response which includes month name, day etc.
          const [day, date, month, year, time, format] = resTimeStamp
            ? resTimeStamp.split(" ")
            : [];

          setSpecificDate({
            day,
            date,
            month,
            year,
            time,
            format,
          });
          setTimestamp(resTimeStamp);
          const fetchedRegion = getGeoData.results[0].annotations.timezone.name;
          setRegion(fetchedRegion);
          const gmtMoment = moment
            .utc(resTimeStamp)
            .tz(fetchedRegion)
            .format("YYYY-MM-DD HH:mm");
          setCurrentTime(gmtMoment);
        };
        geodata();
        // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      },
      (error) => {
        // Error callback: Handle permission denial or other errors
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.error("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.error("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            console.error("The request to get user location timed out.");
            break;
          case error.UNKNOWN_ERROR:
            console.error("An unknown error occurred.");
            break;
        }
      }
    );
  }, []);

  return (
    <CalanderContext.Provider
      value={{
        timestamp,
        setTimestamp,
        currentTime,
        setCurrentTime,
        specificDate,
        region,
        calanderDate,
        setCalanderDate,
      }}
    >
      {children}
    </CalanderContext.Provider>
  );
};

export const useCalander = () => {
  return useContext(CalanderContext);
};
