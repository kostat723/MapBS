import FormCassandra from "./form_cassandra";
import TableCassandra from "./table_cassandra";
import { createContext, useState, useEffect } from "react";


function Cassandra(){
    const [dataJson, setDataJson] = useState({})
    
    return (
        <div>
            <FormCassandra setDataJson={setDataJson}/>
            <TableCassandra dataJson={dataJson}/>
        </div>
    )
}

export default Cassandra;