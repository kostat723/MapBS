import { useState } from 'react';
import { Search } from 'lucide-react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import './FormSearch.css'

function FormSearch({
    onSubmit,
    className,
    placeholder="Искать здесь...",
    type='text'
}) {
  const [formData, setFormData] = useState("")

  const handleInputChange = (event) => {
    setFormData(event.target.value);
  };

  function handleSubmitForm(event) {
    event.preventDefault();
    onSubmit(formData)
  }

  function handleKeyPress (event) {
    if (event.key === 'Enter') {
      handleSubmitForm();
    }
  };

  return (
    <form onSubmit={handleSubmitForm} className={`form ${className}`}>
      <Input placeholder={placeholder} type={type} onChange={handleInputChange} onKeyPress={handleKeyPress}/>
      <Button icon={Search} type="submit">Поиск</Button>
    </form>
  );
}

export default FormSearch