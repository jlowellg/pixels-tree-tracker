import React from "react";
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

    if (index !== -1) {
      lands[index].time = newTime;
      setLands([...lands]);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Set</Button>
      </PopoverTrigger>
      <PopoverContent className="w-50">
        <form onSubmit={handleSetTime}>
          <Input
            type="datetime-local"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <Button type="submit">Set</Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default SetTime;
