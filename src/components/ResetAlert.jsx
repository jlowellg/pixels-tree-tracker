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

const ResetAlert = ({ landId, lands, setLands }) => {
  const handleReset = () => {
    const index = lands.findIndex((land) => land.id === landId);

    if (index !== -1) {
      lands[index].time = new Date();
      setLands([...lands]);
    }

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
        <button className="customButton smallText">
          <img src="./images/reset-icon.svg" className="smallIcon" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="alertMessage">
          Are you sure you want to Reset land {landId}?
        </AlertDialogHeader>
        <AlertDialogFooter>
          <button className="customButton smallText" onClick={handleCancel}>
            Cancel
          </button>

          <button className="customButton smallText pink" onClick={handleReset}>
            Yes
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ResetAlert;
