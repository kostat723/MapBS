import './panelSettings.css'
import { useState } from 'react'
// import { SlidersHorizontal } from 'lucide-react';
import FormSearch from '../../ui/FormSearch/FormSearch';
import List from '../../ui/List/List';
import Panel from '../../ui/Panel/Panel';
import Point from '../../ui/Point/Point';
import Button from '../../ui/Button/Button';
import Input from '../../ui/Input/Input';

function PanelSettings({onSearch, personalSettings, setPersonalSettings, getTips, runSettings}) {
    const [tips, setTips] = useState(null);

    function onSearchTips(query){
        setTips(getTips(query));
    }
    

    function onHandleSearch(text){
        onSearch(text);
    }

    function onSetFilterStandard_radio(selectedStandard) {
        setPersonalSettings(prev => {
            const newStandards = {};
            
            // Сначала все false
            Object.keys(prev.standards).forEach(standard => {
                newStandards[standard] = false;
            });
            
            // Затем выбранный true
            newStandards[selectedStandard] = true;
            
            return {
                ...prev,
                standards: newStandards
            };
        });
    }
    
    function onSetFilterStandard_checkbox(standard) {
        setPersonalSettings(prev => ({
            ...prev,
            standards: {
                ...prev.standards,
                [standard]: !prev.standards[standard] // инвертируем текущее значение
            }
        }));
    }

    return (
        <Panel className="panel-settings" header="Настройка БС" >
            <FormSearch placeholder='Номер или адрес БС' onSubmit={onHandleSearch} />
            
            <List header={"Стандарт секторов"}>
                {Object.entries(personalSettings.standards).map(([standard, isEnabled]) => (
                    <Point key={standard}>
                        <Input                             
                            type="checkbox"
                            checked={isEnabled}
                            name="standard"
                            value={standard}
                            onChange={() => onSetFilterStandard_checkbox(standard)} // Только стандарт
                        />
                        <span>{standard}</span>
                    </ Point>
                ))}     
            </List>

            <Button onClick={runSettings}> Применить настройки </Button>
            
        </Panel>
    );

}

export default PanelSettings