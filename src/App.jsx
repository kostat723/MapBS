
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './App.css';
import Navigation from './components/navigation/navigation';
import Login from './components/auth/login';
import List_traces from './components/traces/list_traces'
import Cassandra from './components/cassandra/cassandra';
import Loader from './components/loading/loading'
import Map from './components/map/mapView';

// Вынесите компоненты наружу

function NotFound() {
    return <h2>Ресурс не найден</h2>;
}

function Phone(){ return <h3>Смартфоны</h3>;}
function Tablet(){ return <h3>Планшеты</h3>; }
function Products(){
    return(
        <div>
            <h2>Товары</h2>
            <Outlet />
        </div>
    );
}


function App() {

    const arrayBS = [
        {
            id: "1001",
            name: "1001",
            address: "г.Луганск, ул.Советская, д.49",
            lat: 48.567917, 
            lng: 39.297916,
            type: 'macro',
            sectors: [
                {
                    id: "100111",
                    technology: '4G',
                    azimuth: 30,
                    beamwidth: 80,
                    range: 250,
                    power: 10
                },
                {
                    id: "100112",
                    technology: '4G',
                    azimuth: 130,
                    beamwidth: 80,
                    range: 250,
                    power: 10
                },
                {
                    id: "100113",
                    technology: '4G',
                    azimuth: 250,
                    beamwidth: 80,
                    range: 250,
                    power: 10
                },
                {
                    id: "100131",
                    technology: '3G',
                    azimuth: 250,
                    beamwidth: 80,
                    range: 500,
                    power: 10
                },
                {
                    id: "10013",
                    technology: '2G',
                    azimuth: 250,
                    beamwidth: 80,
                    range: 350,
                    power: 10
                }
            ],
            height: 10,
            operator: "MCS"
        },
        {
            id: "923",
            name: "923",
            address: "г.Луганск, ул.Оборонная, с.Авангард",
            lat: 48.559593,  
            lng: 39.320068,
            type: 'macro',
            sectors: [
                {
                    id: "92311",
                    technology: '4G',
                    azimuth: 30,
                    beamwidth: 80,
                    range: 250,
                    power: 10
                },
                {
                    id: "92312",
                    technology: '4G',
                    azimuth: 130,
                    beamwidth: 80,
                    range: 250,
                    power: 10
                },
                {
                    id: "92313",
                    technology: '4G',
                    azimuth: 250,
                    beamwidth: 80,
                    range: 250,
                    power: 10
                },
                {
                    id: "92331",
                    technology: '3G',
                    azimuth: 340,
                    beamwidth: 80,
                    range: 500,
                    power: 10
                },
                {
                    id: "9233",
                    technology: '2G',
                    azimuth: 160,
                    beamwidth: 80,
                    range: 350,
                    power: 10
                }
            ],
            height: 10,
            operator: "MCS"
        }
    ]

    return (
        <div id='app'>
        <BrowserRouter>
            <div id="navigation">                
                <Navigation />
            </div>            
            <div id='main'>                
                <Routes>
                    <Route index path="/" element={<h2 style={{color: 'red', paddingBottom: '3000px'}}>Главная</h2>} />
                    <Route path="/products" element={<Products />}>
                        <Route index element={<h3>Каталог товаров</h3>} />
                        <Route path="phones" element={<Phone />} />
                        <Route path="tablets" element={<Tablet />} />
                    </Route>
                    <Route path="/cassandra" element={<Cassandra />} />
                    <Route path="/loader" element={<Loader />} />
                    <Route path="/map" element={<Map baseStations={arrayBS}/>} />
                    <Route path="/list_traces" element={<List_traces />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            <div id ='footer'>

            </div>
        </BrowserRouter>        
        </div>
        
    );
}

export default App;