import { useState, useEffect } from "react";
import "./App.css";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import SetTime from "./components/SetTime";
import ViewLand from "./components/ViewLand";
import DeleteAllAlert from "./components/DeleteAllAlert";
import ResetAlert from "./components/ResetAlert";
import DeleteAlert from "./components/DeleteAlert";
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

  const [time, setTime] = useState(format(Date.now(), "MMMM dd | hh:mm:ss a"));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(format(Date.now(), "MMMM dd | hh:mm:ss a"));
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

    const existingLand = lands.find((land) => land.id === landId);
    if (landId !== "" && !existingLand) {
      const currentDate = new Date();
      const dateString = currentDate.toString();
      const newLand = {
        id: landId,
        time: dateString,
      };
      setLands([...lands, newLand]);
      setLandId("");
    } else {
      console.log(landId, "Already exists");
    }
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

  const handleSettings = (event) => {
    setSettings(!settings);
  };

  const sortedLands = lands.slice().sort((a, b) => {
    const timeA = new Date(a.time);
    const timeB = new Date(b.time);

    return timeA - timeB;
  });

  return (
    <div className="mainContainer">
      <header>
        <h1 className="title">PiXelS</h1>
        <h2 className="subTitle">Tree Tracker</h2>
        <h6 className="credits">
          <a
            href={`https://twitter.com/jlowell_web3`}
            target="_blank"
            rel="noopener noreferrer"
          >
            by:jlowell
          </a>
        </h6>
        <h3 className="clock">{time}</h3>
      </header>

      <form onSubmit={handleSubmit}>
        <Input
          className="w-40"
          type="number"
          placeholder="Land ID"
          value={landId}
          onChange={(e) => setLandId(e.target.value)}
        />
        <button className="customButton" type="submit">
          Add
        </button>
      </form>
      <br />

      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <td>Land ID</td>
              <td className="hideColumn">Previous time:</td>
              <td className="hideColumn">Comeback in:</td>
              <td>Time Remaining:</td>
              <td className="settingsCell">
                <button
                  className="customButton smallText"
                  onClick={handleSettings}
                >
                  Edit
                </button>
                {settings ? <DeleteAllAlert /> : null}
              </td>
            </tr>
          </thead>
          <tbody>
            {sortedLands.map((land, index) => (
              <tr key={index}>
                <td>
                  <a
                    href={`https://play.pixels.xyz/pixels/share/${land.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {land.id}
                  </a>
                </td>
                <td className="hideColumn">
                  {format(land.time, "MM/dd hh:mm a")}
                </td>
                <td className="hideColumn">
                  {format(addMinutes(land.time, 435), "MM/dd hh:mm a")}
                </td>
                <td>{handleDiff(land.time, land.id)}</td>

                {settings ? (
                  <td className="settingsCell">
                    <ResetAlert
                      landId={land.id}
                      lands={lands}
                      setLands={setLands}
                    />
                    <SetTime
                      landId={land.id}
                      lands={lands}
                      setLands={setLands}
                    />
                    <DeleteAlert
                      landId={land.id}
                      lands={lands}
                      setLands={setLands}
                    />
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
