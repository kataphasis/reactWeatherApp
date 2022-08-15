import { useContext } from "react";
import { DataContext } from "../contexts/DataProvider";
import WeatherDisplay from "./WeatherDisplay";

export default function AnyCity() {
  const {weatherCallAny, display} = useContext(DataContext)
  return (
    <>
      <div>
        <form onSubmit={weatherCallAny}>
          <div>
            <label htmlFor="city">
              City
            </label>
            <input type="text" name="city" id="city" placeholder="Enter a city!" />
          </div>
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}