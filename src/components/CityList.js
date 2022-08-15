import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { DataContext } from "../contexts/DataProvider";

import CityDisplay from "./CityDisplay";

export default function CityList() {
  const { cities } = useContext(DataContext);
  const {user} =useContext(AuthContext)
  return (
    <>
      <div>
        <h1>{user.username}'s Cities</h1>
        <div>
          {cities.map((city, index) => (
            <CityDisplay city={city} key={index} />
          ))}
        </div>
      </div>
    </>
  );
}