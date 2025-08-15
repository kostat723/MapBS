

function List_traces () {

    // const linkes = [
    //     {href: 'http://10.100.28.5:1234/', target: "_blank", name: 'Traces CDR MSS'},
    //     {href: 'http://10.100.28.5:9000/', target: "_blank", name: 'Traces MME'}
    // ]

    return (
        <ul>
            {
                linkes.map((link) => {
                    return <li key={link.name}><a href={`${link.href}`} target={`${link.target}`}>{link.name}</a></li> 
                })
            }
        </ul>
    )
}

export default List_traces