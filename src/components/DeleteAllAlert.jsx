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

const DeleteAllAlert = () => {
  const handleClearAll = (event) => {
    event.preventDefault();
    localStorage.removeItem("lands");
    window.location.reload();
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
          <img src="./images/trash-icon-white.svg" className="smallIcon" /> All
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="alertMessage">
          Are you sure you want to Delete All?
        </AlertDialogHeader>
        <AlertDialogFooter>
          <button className="customButton smallText" onClick={handleCancel}>
            Cancel
          </button>

          <button
            className="customButton smallText pink"
            onClick={handleClearAll}
          >
            Yes
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAllAlert;
