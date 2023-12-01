import { Type_location_DATA, Type_sideWays_DATA } from "../../../../../Container";


export default function services_onClick_setStartEnd(
  location_DATA: Type_location_DATA,
  sideWays_DATA: Type_sideWays_DATA
) {


  if (!location_DATA.startPoints.address) {
    const UPDATE_OBJECT_NEW_LOCATION = {
      ...location_DATA,
      startPoints: {
        address: sideWays_DATA.clickOnMap.address,
        latLng: sideWays_DATA.clickOnMap.latLng,
      },
    };
    return UPDATE_OBJECT_NEW_LOCATION;

  } else if (!location_DATA.endPoints.address) {
    const UPDATE_OBJECT_NEW_LOCATION = {
      ...location_DATA,
      endPoints: {
        address: sideWays_DATA.clickOnMap.address,
        latLng: sideWays_DATA.clickOnMap.latLng,
      },
    };
    return UPDATE_OBJECT_NEW_LOCATION;

  } else {
    const COORDINATE_AND_ADDRESS = {
      identObject: location_DATA.arrayALL_coordinate.length,
      address: sideWays_DATA.clickOnMap.address,
      latLng: sideWays_DATA.clickOnMap.latLng,
    };

    const isDuplicate = location_DATA.arrayALL_coordinate.some(item => {
      // Porovnání objektu s COORDINATE_AND_ADDRESS
      if (COORDINATE_AND_ADDRESS.latLng) {
        return (
          item.identObject === COORDINATE_AND_ADDRESS.identObject ||
          item.address === COORDINATE_AND_ADDRESS.address ||
          item.latLng[0] === COORDINATE_AND_ADDRESS.latLng[0] ||
          item.latLng[1] === COORDINATE_AND_ADDRESS.latLng[1]
        );
      };
    }
    );
    if (!isDuplicate) {

      // Pokud objekt s hodnotou COORDINATE_AND_ADDRESS neexistuje, přidejte ho do pole
      const UPDATE_OBJECT_NEW_LOCATION = {
        ...location_DATA,
        arrayALL_coordinate: [
          ...location_DATA.arrayALL_coordinate,
          COORDINATE_AND_ADDRESS,
        ],
      };
      return UPDATE_OBJECT_NEW_LOCATION;
    } else {
      // Objekt s hodnotou COORDINATE_AND_ADDRESS již existuje, takže nemusíte nic měnit
      return location_DATA;
    }
  }
}
