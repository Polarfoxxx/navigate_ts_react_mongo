import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import services_ChangeTheObjectForTheTable from './services/services_ChangeTheObjectForTheTable';
import { Type_IRow, Type_forLocationInfoResult } from './types';
import "ag-grid-community/styles/ag-grid.css";
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Importujte požadovaný motiv
import './ag_GridTable.style.css';
import { ColDef, RowSelectedEvent } from 'ag-grid-community';
import { UseChangeContextDATA } from '../../../../hooks';
import { GeocoderInputSearche } from "../../../../Geocoder";
import { Container } from '../../../../Container';

// Create new GridExample component
function AG_GridTable(props: Type_forLocationInfoResult): JSX.Element {
    const { location_DATA } = React.useContext(Container.Context);
    const { startPoints, endPoints } = location_DATA;
    const geocoderService = new GeocoderInputSearche();
    const { updateContext_DATA } = UseChangeContextDATA();
    const [rowData, setRowData] = React.useState<Type_IRow[]>([])
    const [colDefs] = React.useState<ColDef[]>([
        { field: 'type',width: 200 },
        { field: 'name',width: 250 },
        { field: 'population',width: 250 },
        { field: 'countryName',width: 250 },
        { field: 'countryId',width: 250 },
        { field: 'adminDivision1Name',width: 250 },
        { field: 'coodrinate',width: 250 },
    ]);
    const defaultColDef = React.useMemo<ColDef>(() => {
        return {
            filter: true,
        };
    }, []);

    React.useEffect(() => {
        setRowData(services_ChangeTheObjectForTheTable(props.respoDATA));
    }, [JSON.stringify(props.respoDATA)])

    

    const onCellClicked = async (e: RowSelectedEvent) => {
        const SELECT_COORDIANTE = e.data.coodrinate;
        const COORDINATE_NUMB_FORMATE: number[] = SELECT_COORDIANTE.split(',').map((coord: string) => parseFloat(coord.trim()));
        const NAME_LOCATION = e.data.name
        const GEOCODER_DATA = await geocoderService.getCoordinatesForAddress(NAME_LOCATION);
        const UPDATE_DATA = {
            address: GEOCODER_DATA,
            latLng: COORDINATE_NUMB_FORMATE,
        };

        if (startPoints.address.label && !endPoints.address.label) {
            updateContext_DATA([
                { newData: UPDATE_DATA, key: "startPoints" },
            ]);
        } else if (startPoints.address.label && endPoints.address.label) {
            updateContext_DATA([
                { newData: UPDATE_DATA, key: "endPoints" },
            ]);
        }

    };

    return (
        <div className="ag-theme-alpine-dark">
            <AgGridReact
                rowSelection={'multiple'}
                onRowClicked={onCellClicked}
                rowData={rowData}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                pagination={true} />
        </div>
    );
};

export default AG_GridTable;