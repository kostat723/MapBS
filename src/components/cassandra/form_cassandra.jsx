import { useState, useEffect } from 'react';





function FormCassandra(props) {
    const [numberIMSI, setNumberIMSI] = useState(0)
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [addressIP, setAddressIP] = useState("")
    const [abonents, setAbonents] = useState()
    const [err, setError] = useState()

    function onClick(e){

        console.log(numberIMSI, startDate, endDate, addressIP)

        fetch(`http://localhost:5000/imsi/${numberIMSI}`)
            .then(res => res.json())
            .then(setAbonents)
            .catch(err => setError(err.message));        
    }

    useEffect(() => {
        if (abonents) 
            props.setDataJson(abonents)
        else if (err)
            console.log(err)
    }, [abonents, err])

    return (
        <div>
            <p>
                <label>Number IMSI abonent: </label> 
                <input type="number" defaultValue={numberIMSI} onChange={(e) => {setNumberIMSI(e.target.value)}} /> 
            </p>
            <p>
                <label>Start Date: </label> 
                <input type="datetime-local" defaultValue={startDate} onChange={(e) => {setStartDate(e.target.value)}} />
                 <label>End Date: </label> 
                <input type="datetime-local" defaultValue={endDate} onChange={(e) => {setEndDate(e.target.value)}} />
            </p>
            
            <button onClick={onClick}>Поиск</button>
        </div>
    )
}

export default FormCassandra;