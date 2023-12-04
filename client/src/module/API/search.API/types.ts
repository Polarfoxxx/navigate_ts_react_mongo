
export type Type_RAW_DATA_response_bussiness = {
    distance: number;
    distanceUnit: string;
    fields: {
      address: string;
      city: string;
      country: string;
      disp_lat: number;
      disp_lng: number;
      group_sic_code: string;
      group_sic_code_ext: string;
      group_sic_code_name: string;
      group_sic_code_name_ext: string;
      id: string;
      lat: number;
      lng: number;
      mqap_geography: {
        latLng: {
          lng: number;
          lat: number;
        };
      };
      mqap_id: string;
      name: string;
      phone: string;
      postal_code: string;
      side_of_street: string;
      state: string;
    };
    key: string;
    name: string;
    resultNumber: number;
    shapePoints: number[];
    sourceName: string;
  };
  

