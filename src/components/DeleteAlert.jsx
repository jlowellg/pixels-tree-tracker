import React from "react";
import "../App.css";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

const DeleteAlert = ({ landId, lands, setLands }) => {
  const handleDelete = () => {
    const updatedLands = lands.filter((item) => item.id !== landId);
    setLands(updatedLands);

    const escapeEvent = new KeyboardEvent("keydown", {
      key: "Escape",
    });

    document.dispatchEvent(escapeEvent);
  };

  const handleCancel = () => {
    const escapeEvent = new KeyboardEvent("keydown", {
      key: "Escape",
    });

    document.dispatchEvent(escapeEvent);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="customButton smallText pink">
          <img src="./images/trash-icon-white.svg" className="smallIcon" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="alertMessage">
          Are you sure you want to Delete land {landId}?
        </AlertDialogHeader>
        <AlertDialogFooter>
          <button className="customButton smallText" onClick={handleCancel}>
            Cancel
          </button>

          <button
            className="customButton smallText pink"
            onClick={handleDelete}
          >
            Yes
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlert;
