import { useContext } from "react"
import { DataContext } from "../contexts/DataProvider"
export default function WeatherDisplay() { 
  const {display} = useContext(DataContext)
  
    return (
        <div>
        <div>
          <p>{display.city}</p>
          <div>
            <p>{display.temperature}</p>
          </div>
          <div>{display.forecast}</div>
        </div>
        <div>
          <div>
            <p>High</p>
            <hr />
            <p>{display.high}</p>
          </div>
          <div>
            <p>Low</p>
            <hr />
            <p>{display.low}</p>
          </div>
          <div>
            <p>Humidity</p>
            <hr />
            <p>{display.humidity}</p>
          </div>
        </div>
      </div>
    )
}