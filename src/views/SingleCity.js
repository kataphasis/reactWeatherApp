import { useContext, useEffect, useState } from "react";
import WeatherDisplay from "../components/WeatherDisplay";
import { DataContext } from "../contexts/DataProvider";


export default function SingleCity() { 
    const { city } = useState({})
    const {weatherCallSaved} = useContext(DataContext)

    useEffect(() =>{
        weatherCallSaved(city)
    }, [city])

    return (
        <>
        <WeatherDisplay />
        </>
    )
}

