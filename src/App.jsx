import { useState, useEffect } from "react";
import "./App.css";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import SetTime from "./components/SetTime";
import {
  format,
  formatDuration,
  addHours,
  addMinutes,
  differenceInMinutes,
  differenceInHours,
} from "date-fns";

function App() {
  const [landId, setLandId] = useState("");
  const [lands, setLands] = useState([]);
  const [settings, setSettings] = useState(false);

  const [time, setTime] = useState(format(Date.now(), "MM/dd hh:mm:ss a"));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(format(Date.now(), "MM/dd hh:mm:ss a"));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchLands = () => {
      const storedLands = localStorage.getItem("lands");
      if (storedLands) {
        setLands(JSON.parse(storedLands));
      }
    };

    fetchLands();

    const intervalId = setInterval(fetchLands, 1000);

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
      const newLand = {
        id: landId,
        time: dateString,
      };
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
    const diffMinutes = differenceInMinutes(addMinutes(time, 435), Date.now());

    const index = lands.findIndex((land) => land.id === id);

    if (diffMinutes < 0) {
      lands[index].time = addMinutes(time, 435);
    }

    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    const timeRemaining = `${hours}h:${minutes}m`;
    return timeRemaining;
  };

  const handleDelete = (id) => {
    const updatedLands = lands.filter((item) => item.id !== id);
    setLands(updatedLands);
  };

  const handleReset = (id) => {
    const index = lands.findIndex((land) => land.id === id);

    if (index !== -1) {
      lands[index].time = new Date();
      setLands([...lands]);
    }
  };

  const handleSettings = (event) => {
    setSettings(!settings);
  };

  return (
    <div className="mainContainer">
      <header>
        <h1 className="title">PiXelS Tree</h1>
        <h3>{time}</h3>
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

      <Button onClick={handleSettings}>Edit</Button>

      <table>
        <thead>
          <tr>
            <td>Land ID</td>
            <td>Previous time:</td>
            <td>Comeback in:</td>
            <td>Time Remaining:</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {lands.map((land, index) => (
            <tr key={index}>
              <td>{land.id}</td>
              <td>{format(land.time, "MM/dd hh:mm a")}</td>
              <td>{format(addMinutes(land.time, 435), "MM/dd hh:mm a")}</td>
              <td>{handleDiff(land.time, land.id)}</td>

              {settings ? (
                <td>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(land.id)}
                  >
                    del
                  </Button>
                  <Button onClick={() => handleReset(land.id)}>Reset</Button>
                  <SetTime landId={land.id} lands={lands} setLands={setLands} />
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
