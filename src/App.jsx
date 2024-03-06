import { useState, useEffect } from "react";
import "./App.css";
import AddForm from "./components/AddForm";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { format, addHours, addMinutes, differenceInMinutes } from "date-fns";

function App() {
  const [landId, setLandId] = useState("");
  const [lands, setLands] = useState([]);

  useEffect(() => {
    const fetchLands = () => {
      const storedLands = localStorage.getItem("lands");
      if (storedLands) {
        setLands(JSON.parse(storedLands));
      }
      console.log("refreshed");
    };

    fetchLands();

    const intervalId = setInterval(fetchLands, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (lands.length) {
      localStorage.setItem("lands", JSON.stringify(lands));
    }
  }, [lands]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (landId.trim() !== "") {
      const currentDate = new Date();
      const dateString = currentDate.toString();
      const newLand = { id: landId, time: dateString };
      setLands([...lands, newLand]);
      setLandId("");
    }
  };

  const handleClearAll = (event) => {
    event.preventDefault();
    localStorage.removeItem("lands");
    window.location.reload();
  };

  const handleDiff = (time, id) => {
    const diff = differenceInMinutes(
      format(addMinutes(time, 5), "yyyy-MM-dd hh:mm:ss"),
      format(new Date(), "yyyy-MM-dd hh:mm:ss")
    );

    const index = lands.findIndex((land) => land.id === id);

    if (diff <= 0) {
      lands[index].time = addMinutes(time, 5);
    }

    return diff;
  };

  return (
    <div className="mainContainer">
      <header>
        <h1 className="title">PiXelS Tree</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <Input
          className="w-40"
          type="number"
          placeholder="Land ID"
          value={landId}
          onChange={(e) => setLandId(e.target.value)}
        />
        <Button type="submit">Add</Button>
      </form>
      <br />
      <Button variant="destructive" onClick={handleClearAll}>
        Clear All
      </Button>

      <table>
        <thead>
          <tr>
            <td>Land ID</td>
            <td>Previous time:</td>
            <td>Comeback in:</td>
            <td>Time Remaining:</td>
          </tr>
        </thead>
        <tbody>
          {lands.map((land, index) => (
            <tr key={index}>
              <td>{land.id}</td>
              <td>{format(land.time, "MM/dd hh:mm a")}</td>
              <td>{format(addMinutes(land.time, 5), "hh:mm a")}</td>
              <td>{handleDiff(land.time, land.id)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
