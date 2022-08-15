import { createContext, useEffect, useState, useContext } from "react";
import {
  getFirestore,
  getDocs,
  collection,
  collectionGroup,
  addDoc,
  doc,
  getDoc,
  where,
  Timestamp,
  query,
  orderBy,
} from "@firebase/firestore";
import { AuthContext } from "./AuthProvider";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const { user, auth } = useContext(AuthContext);
  const [display, setDisplay] = useState({});
  const [cities, setCities] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const getCities = async () => {
      if (!user.loggedIn) {
        return;
      }
      const citiesRef = collection(db, "cities");
      console.log(user);
      const q = query(citiesRef, where("user_id", "==", user.id));
      const querySnap = await getDocs(q);
      let citiesArr = [];
      querySnap.forEach((docSnap) => {
        console.log(docSnap.data());
        citiesArr.push(docSnap.data());
      });
      setCities(citiesArr);
    };
    getCities();
  }, [user]);

  const addFavorite = async (city) => {
    if (!user.loggedIn) {
      new Error("You can't add a favorite if you are not logged in.");
    }
    const newFavorite = {
      city,
      user_id: user.id,
    };
    const docRef = await addDoc(collection(db, "cities"), newFavorite);
    setCities([...cities, newFavorite]);
    console.log("new city added", docRef.id);
  };

  function weatherCallAny(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const entry = Object.fromEntries(formData);
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${entry.city}&appid=4fbf458a7369a9ca1c284ae2e7021dcc`
        );
        let data = await response.json();
        console.log(data);
        const refinedData = weatherObj(
          data.name,
          Math.floor(temperatureConverter(data.main.temp)),
          toTitleCase(data.weather[0].description),
          data.weather[0].icon,
          Math.floor(temperatureConverter(data.main.temp_max)),
          Math.floor(temperatureConverter(data.main.temp_min)),
          data.main.humidity
        );
        console.log("Result", refinedData);
        setDisplay(refinedData);
      } catch (err) {
        console.log(err);
        if (err instanceof TypeError) {
          console.log("Error!");
        }
      }
    };
    fetchWeatherData();
    event.target.reset();
  }

  const weatherObj = (
    city,
    temperature,
    forecast,
    icon,
    high,
    low,
    humidity
  ) => {
    city = {
      city: city,
      temperature: temperature,
      forecast: forecast,
      icon: `http://openweathermap.org/img/wn/${icon}@2x.png`,
      high: high,
      low: low,
      humidity: humidity,
    };
    return city;
  };

  function temperatureConverter(valNum) {
    valNum = parseFloat(valNum);
    return (valNum - 273.15) * 1.8 + 32;
  }

  function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }
  const values = {
    weatherCallAny,
    display,
    addFavorite,
    cities,
  };
  return (
    <DataContext.Provider value={values}>{props.children}</DataContext.Provider>
  );
};


