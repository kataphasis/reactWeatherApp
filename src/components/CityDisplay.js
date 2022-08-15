import { Link } from "react-router-dom";
export default function CityDisplay(props) {
  return (
    <div>
      <h1>{props.city.city}</h1>
      <button>
        <Link to={"/cities/" + props.city.city}> View Weather</Link>
      </button>
    </div>
  );
}