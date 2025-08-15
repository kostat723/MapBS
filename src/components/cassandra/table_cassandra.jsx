import { useEffect, useState} from "react";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

function ShowTable(props){
    const paginationModel = { page: 0, pageSize: 100 };

    console.log(props.rows, props.columns)

    return (
        <Paper sx={{ height: '80vh', width: '100%' }}>
        <DataGrid
            rows={props.rows}
            columns={props.columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 100]}
            checkboxSelection
            sx={{ border: 0 }}
        />
        </Paper>
    )
}

function ButtonsOfTables(props){
    return (
        <div id="buttons">
            {
            props.tables.map((table) => {
                return <button key={table} id={table} onClick={() => {props.setCurrentTable(table)}}>{table}</button>
            })
            }
        </div>    
    )
}


function TableCassandra(props){
    const [rows, setRows] = useState([])
    const [columns, setColumns] = useState([])
    const [tables, setTables] = useState({})
    const [listTables, setListTables] = useState([])

    function parseData(table, headers, rows_){
        let temp_columns = []
        headers.map((header) => {
            temp_columns.push({field: `${header}`, headerName: `${header}`})
        })
        
        let temp_rows = []
        rows_.map((row, index) => {            
            let temp_row = {id: index}
            temp_columns.map((column, id) => {
                temp_row[column.field] = row[0][id]
            })
            temp_rows.push(temp_row)            
        })
        
        setTables(tables => ({...tables, [table]: {columns: temp_columns, rows: temp_rows}}))
    }

    function setCurrentTable (table) {
        if (tables[table] !== undefined){
            setColumns(tables[table].columns)
            setRows(tables[table].rows)
        }
    }

    useEffect(() => {
        if (props.dataJson.result !== undefined){
            
            let temp_listTables = []
            Object.keys(props.dataJson.result).forEach((table) => {
                temp_listTables.push(table)
                parseData(table, props.dataJson.result[table].headers, props.dataJson.result[table].data)
            })
            setListTables(temp_listTables)
        }
    }, [props.dataJson])

    console.log("table")

    return (
        <div id='table'>
            <ButtonsOfTables tables={listTables} setCurrentTable={setCurrentTable}/>
            <ShowTable rows={rows} columns={columns} />
        </div>
    )
}

export default TableCassandra;