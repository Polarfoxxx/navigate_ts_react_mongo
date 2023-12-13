import { Type_Addrress } from "../../../Container";

export type Type_fromGeocoderMapClickSearche = [lat: number, lng: number];

export type Type_returning_object = {
  address: Type_Addrress;
  latLng: number[];
  type?: string
};
