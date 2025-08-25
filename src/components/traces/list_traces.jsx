import { useRef } from 'react'
import Input from '../ui/Input/Input'


function List_traces () {
    const linkes = [{name: "", href: "", target: ""}]
    const test = useRef({
        sites: null,
        sectors: {
            gsm: null,
            umts: null,
            lte: null
        }
    })


        

    function onClick(){
        if ("gsm" in test.current.sectors){
            console.log(test.current.sectors["gsm"])
        }
        
    }

    return (
        <div>
            <ul>
            {
                linkes.map((link) => {
                    return <li key={link.name}><a href={`${link.href}`} target={`${link.target}`}>{link.name}</a></li> 
                })
            }
            <button onClick={onClick}>Запуск</button>            
            </ul>
            <p style={{color: 'black'}}><b>Каким браузером в основном пользуетесь:</b><br/>
                <input type="radio" name="browser" value="ie" /> Internet Explorer<br/>
                <input type="radio" name="browser" value="opera" /> Opera<br/>
                <input type="radio" name="browser" value="firefox" /> Firefox<br/>
            </p>
        </div>
    )
}

export default List_traces