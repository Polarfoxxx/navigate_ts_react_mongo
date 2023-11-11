import React from "react";
import { Polygon, Rectangle } from "react-leaflet";
import services_highestCoordInTheAreasOf from "../IncidentsToMap/services/services_highestCoordInTheAreasOf";
import { Container } from "../../../Container";
import { useMap } from "react-leaflet";


function PoligonXXX() {

  const MAP = useMap()
  const [rectagleCoord, setRectagleCoord] = React.useState([]);
  const { location_DATA, sideWays_DATA, } = React.useContext(Container.Context);
  const {route} = location_DATA


  let hhh = [];
  const ALLRouads = services_highestCoordInTheAreasOf(location_DATA);

  React.useEffect(() => {
    if (location_DATA.route.length > 0) {
      ALLRouads.forEach((item) => {
        const hh = [item.norther, item.western];
        const gg = [item.south, item.easter];
        hhh.push([hh, gg]);
        setRectagleCoord(hhh)
      });
    }
  }, [location_DATA.route]);


  const blackOptions = { color: "black" };
  

  return (
    <>
      {rectagleCoord && sideWays_DATA.incident &&
        rectagleCoord.map((item, key) => (
          <Rectangle key={key} bounds={item} pathOptions={blackOptions} />
        ))}
    </>
  );
}

export default PoligonXXX;
