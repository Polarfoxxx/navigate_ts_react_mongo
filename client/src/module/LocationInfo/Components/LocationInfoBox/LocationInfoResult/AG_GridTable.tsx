import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import services_ChangeTheObjectForTheTable from './services/services_ChangeTheObjectForTheTable';
import { Type_IRow, Type_forLocationInfoResult } from './types';


// Create new GridExample component
function AG_GridTable(props: Type_forLocationInfoResult): JSX.Element {
    const [rowData, setRowData] = React.useState<Type_IRow[]>([])
    const [colDefs] = React.useState<ColDef[]>([
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


    return (
        <div className={"ag-theme-quartz-dark"}
            style={{ width: '100%', height: '100%' }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                pagination={true} />
        </div>
    );
};

export default AG_GridTable;