import { Type_UserSaveHistoryRouteObjekt } from "../../../..";



type Type_for_ServicesTheMatchOfTheCreatedObjekt = {
    save_historyRoute: Type_UserSaveHistoryRouteObjekt[],
    UPDATE_DATA: Type_UserSaveHistoryRouteObjekt
};


function services_theMatchOfTheCreatedObject(props: Type_for_ServicesTheMatchOfTheCreatedObjekt): number {
    
            const index = props.save_historyRoute.findIndex(item => {
                return (
                    item.startPoint === props.UPDATE_DATA.startPoint ||
                    item.endPoint === props.UPDATE_DATA.endPoint ||
                    item.addPoint === props.UPDATE_DATA.addPoint ||
                    item.routeName === props.UPDATE_DATA.routeName ||
                    item.routeTime === props.UPDATE_DATA.routeTime ||
                    item.routeDistance === props.UPDATE_DATA.routeDistance
                );
            });
      return index
}; 



export default services_theMatchOfTheCreatedObject;