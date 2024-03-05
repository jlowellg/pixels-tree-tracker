import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const AddForm = () => {
  return (
    <form>
      <Input
        className="w-40"
        type="number"
        placeholder="Land ID"
        min="1"
        max="9999"
      />
      <Button>Add</Button>
    </form>
  );
};

export default AddForm;
