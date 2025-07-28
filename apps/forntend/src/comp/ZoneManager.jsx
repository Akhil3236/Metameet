
import { useEffect, useState } from "react";
import { getZoneFromCoords } from '../comp/Zone.js';

const ZoneManager = ({ position }) => {
  const [zone, setZone] = useState(null);

  useEffect(() => {
    const currentZone = getZoneFromCoords(position.x,position.y);
    if (currentZone !== zone) {
      setZone(currentZone);
      handleZoneEnter(currentZone);
    }
  }, [position]);

  const handleZoneEnter = (newZone) => {
    switch (newZone) {
      case "class":
        console.log("📚You entered the Class zone! Text chat enabled.");
        break;
      case "drawRoom":
        console.log(" Welcome to the Draw Room! Start drawing and share files.");
        break;
      case "common":
        console.log(" You're in the Common Area. Voice chat is live!");
        break;
      case "closet":
        console.log(" You're in the Inventory Closet (read-only area).");
        break;
      default:
        break;
    }
  };

  return null;
};

export default ZoneManager;
