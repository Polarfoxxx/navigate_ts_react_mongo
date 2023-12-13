import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import services_ChangeTheObjectForTheTable from './services/services_ChangeTheObjectForTheTable';
import { Type_IRow, Type_forLocationInfoResult } from './types';
import "ag-grid-community/styles/ag-grid.css";
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Importujte požadovaný motiv
import './ag_GridTable.style.css';
import {
    ColDef,
    ColGroupDef,
    GridApi,
    GridOptions,
    GridReadyEvent,
    RowSelectedEvent,
    SelectionChangedEvent,
    createGrid,
} from 'ag-grid-community';
import { UseChangeContextDATA } from '../../../../hooks';
import { Container } from '../../../../Container';
import { GeocoderInputSearche } from "../../../../Geocoder";



// Create new GridExample component
function AG_GridTable(props: Type_forLocationInfoResult): JSX.Element {
    const geocoderService = new GeocoderInputSearche();
    const { location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context);
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA });
    const [rowData, setRowData] = React.useState<Type_IRow[]>([])
    const [colDefs] = React.useState<ColDef[]>([
        { field: 'type' },
        { field: 'name', filter: true },
        { field: 'population' },
        { field: 'countryName' },
        { field: 'countryId' },
        { field: 'adminDivision1Name' },
        { field: 'coodrinate' },
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


        updateContext_DATA([
            { newData: UPDATE_DATA, key: "startPoints" },
        ]);
    }



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