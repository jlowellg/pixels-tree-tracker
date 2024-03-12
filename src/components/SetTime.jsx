import React from "react";
import "../App.css";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { parse } from "date-fns";

const SetTime = ({ landId, lands, setLands }) => {
  const [time, setTime] = useState("");

  const handleSetTime = (event) => {
    event.preventDefault();
    const newTime = parse(time, "yyyy-MM-dd'T'HH:mm", new Date());

    const index = lands.findIndex((land) => land.id === landId);

    if (index !== -1 && time !== "") {
      lands[index].time = newTime;
      setLands([...lands]);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="customButton smallText">
          <img src="./images/set-icon.svg" className="smallIcon" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-50">
        <div>
          <h1 className="landID">{landId}</h1>
          <form onSubmit={handleSetTime}>
            <Input
              type="datetime-local"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <button className="customButton" type="submit">
              Set
            </button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SetTime;
