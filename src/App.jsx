
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
                    <Route path="/map" element={<Map />} />
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