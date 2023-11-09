import { Type_location_DATA } from "../../../../Container";
import { Type_CoordAllRoads_LatLng, Type_MostedCoordinate_Arr } from "../types";


function services_highestCoordInTheAreasOf(location_DATA: Type_location_DATA): Type_MostedCoordinate_Arr[] {
  let COORD_ALL_ROADS: Type_CoordAllRoads_LatLng[][] = [];
  const RECTANGLE_KM = 500;
  const ALL_POINTS_ROAD = location_DATA.route;
  let most_northEast_cord: Type_MostedCoordinate_Arr[] = [];

  // Projdeme všechny objekty v ALL_POINTS
  ALL_POINTS_ROAD.forEach((item) => {
    const COORDINATES = item.coordinates; // Získáme pole koordinát z aktuálního objektu "item"
    const DISTANCE = item.totalDistance / 1000; // Získáme vzdialenost deleno 1000
    const DEL_DISTANCE = Math.max(1, Math.round(DISTANCE / RECTANGLE_KM)); // na kolko sa rozdeli velke pole
    const COUNT_NESTED_ARR = DEL_DISTANCE; // Počet menších polí
    const COUNT_COORD_IN_ARR = Math.ceil(COORDINATES.length / COUNT_NESTED_ARR); // Počet súradníc v každom menšom poli
    const DATA = []; // Inicializujeme veľké pole pre menšie polia

    for (let i = 0; i < COORDINATES.length; i += COUNT_COORD_IN_ARR) {
      // Rozdelíme pôvodné pole na menšie polia
      const chunk = COORDINATES.slice(i, i + COUNT_COORD_IN_ARR);
      DATA.push(chunk);
    }
    COORD_ALL_ROADS.push(DATA);
  });
  /* najdenie najsevernesieho a najvychodnejsieho coordinatu */
  /* ------------------------------------------------------------------------ */

  COORD_ALL_ROADS.forEach((item) => {
    item.forEach((items) => {
      let northernmostCoord = items[0]; /* naj S */
      let westernmostCoord = items[0]; /* naj Z */

      let easternmostCoord = items[0]; /* naj V */
      let southernmostCoord = items[0]; /* naj J */

      for (const coord of items) {
        if (coord.lat > northernmostCoord.lat) {
          northernmostCoord = coord; /* latidute najde najsevernejsi bod */
        }
        if (coord.lng < westernmostCoord.lng) {
          westernmostCoord = coord; /* latidute najde najsevernejsi bod */
        }

        if (coord.lat < southernmostCoord.lat) {
          southernmostCoord = coord; /* latidute najde najsevernejsi bod */
        }
        if (coord.lng > easternmostCoord.lng) {
          easternmostCoord = coord; /* latidute najde najsevernejsi bod */
        }
      }

      const MOST_CORD: Type_MostedCoordinate_Arr = {
        norther_western: [northernmostCoord.lat, westernmostCoord.lng],
        south_east: [southernmostCoord.lat, easternmostCoord.lng]
      };

      most_northEast_cord.push(MOST_CORD);
    });
  });
  return most_northEast_cord;
};

export default services_highestCoordInTheAreasOf;
