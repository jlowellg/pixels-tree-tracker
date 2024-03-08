import React from "react";
import "../App.css";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

const ViewLand = ({ id }) => {
  const link = `https://play.pixels.xyz/pixels/share/${id}`;
  return (
    <Drawer>
      <DrawerTrigger>{id}</DrawerTrigger>
      <DrawerContent className="drawer">
        <iframe
          className="cctv"
          width="560" // Set width as needed
          height="315" // Set height as needed
          src={link}
          frameborder="0"
        />
        <h2 className="cctvLabel">{id}</h2>
      </DrawerContent>
    </Drawer>
  );
};

export default ViewLand;
