import './panelSettings.css'
import { useState } from 'react'
import { Radio, MapPin, Zap, Signal, ChevronRight, ChevronLeft } from 'lucide-react';
import FormSearch from '../../ui/FormSearch/FormSearch';
import Panel from '../../ui/Panel/Panel';

function PanelSettings({onSearch, findedBS}) {
    const [isPanelCollapsed, setIsCollapsed] = useState(false);
    const [showSectors, setShowSectors] = useState(false);
    const [filterStandard, setFilterStandard] = useState(["2G", "3G", "4G"]);


    function onHandleSearch(text){
        onSearch(text);
    }

    return (
        <Panel className="panel-settings" header="Настройка БС">
            <FormSearch placeholder='Номер или адрес БС' onSubmit={onHandleSearch}/>
        </Panel>
    );

}

export default PanelSettings