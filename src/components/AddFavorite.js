import { useContext } from "react";
import { DataContext } from "../contexts/DataProvider";

export default function AddFavorite() {
  const { addFavorite } = useContext(DataContext);


  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    addFavorite(data.city);
    event.target.reset()
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
            <h1>City</h1>
            <input
              type="text"
              name="city"
              id="city"
              placeholder="Enter a city"
            />
        </form>
      </div>
    </>
  );
}