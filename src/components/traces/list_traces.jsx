

function List_traces () {


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