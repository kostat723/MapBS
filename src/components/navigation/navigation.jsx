import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './navigation.css'

const setActive = ({ isActive }) => (isActive ? " active" : "");

function Navigation() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
        setCurrentTime(new Date()); // Обновляем время каждую секунду
        }, 1000);

        return () => clearInterval(timer); // Очистка таймера при размонтировании
    }, []);

    return (
        <header>
        <nav>
            <div id='pages'>
                <NavLink to="/" className={setActive}>Главная</NavLink>  
                <NavLink to="/not_products" className={setActive}>Not Товары</NavLink>
                <NavLink to="/cassandra" className={setActive}>Cassandra</NavLink>
                <NavLink to="/list_traces" className={setActive}>Трейсы</NavLink>
                <NavLink to="/map" className={setActive}>Карта</NavLink>
                <p>DateTime: {currentTime.toLocaleString()}</p>
            </div>
            <div id='auth'>
                <NavLink to="/login" >Войти</NavLink>  
            </div>
        </nav>
        </header>
    )
}

export default Navigation;
