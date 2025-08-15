import { useState } from 'react';

function Login(){

    const [name, setName] = useState("");  // состояние
 
    // обработчик события
    function onChange(e) {
        setName(e.target.value);  // изменяем состояние
    }
    // обработчик отправки формы
    function handleSubmit(e) {
        e.preventDefault(); // блокируем стандартную отправку формы
        console.log("Name: ", name);
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <p>
                <label>Имя:</label><br />
                <input type="text" value={name} onChange={onChange}/>
            </p>
            <input type="submit" value="Отправить" />
        </form>
    );
}

export default Login;