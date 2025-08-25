import './Input.css'

function Input({
    type = 'text',
    placeholder = '',
    className = '',
    value,
    onChange,
    onKeyPress,
    checked,
    ...props
}){
    const inputProps = {
        className: `input ${className}`,
        type,
        placeholder,
        onChange,
        onKeyPress,
        ...props
    };

    // Для checkbox и radio используем checked, для других - value
    if (type === 'checkbox' || type === 'radio') {
        inputProps.checked = checked;
    } else {
        inputProps.value = value;
    }

    return <input {...inputProps} />;
}

export default Input

// import './Input.css'
// import { useState, useMemo } from 'react';

// const Input = ({ 
//     children,
//     type = 'text',
//     placeholder = '',
//     className = '',
//     value,
//     onChange,
//     onKeyPress,
//     tips = [],
//     onSelect,
//     ...props
//  }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');

//      const handleKeyDown = (e) => {
//     if (!isOpen) return;

//     switch (e.key) {
//       case 'ArrowDown':
//         e.preventDefault();
//         setSelectedIndex(prev => 
//           prev < filteredOptions.length - 1 ? prev + 1 : prev
//         );
//         break;
//       case 'ArrowUp':
//         e.preventDefault();
//         setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
//         break;
//       case 'Enter':
//         e.preventDefault();
//         if (selectedIndex >= 0 && filteredOptions[selectedIndex]) {
//           handleSelect(filteredOptions[selectedIndex].value, filteredOptions[selectedIndex].label);
//         }
//         break;
//       case 'Escape':
//         setIsOpen(false);
//         break;
//     }
//   };

//   const filteredTips = useMemo(() => {
//     return tips?.filter(tip =>
//       tip.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [tips, searchTerm]);

//   const handleSelect = (tip) => {
//     setSearchTerm(tip);
//     setIsOpen(false);
//     onSelect(tip);
//   };

//   return (
//     <div style={{ position: 'relative', width: '250px'}}>
//       <input
//         className={`input ${className}`}
//         type={type} 
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//         onKeyPress={onKeyPress}
//         onKeyDown={handleKeyDown}
//         onFocus={() => setIsOpen(true)}
//         {...props}
//       />
      
//       {isOpen && (
//         <div className='drop-down'>
//           {!filteredTips || filteredTips.length === 0 ? (
//             <div className='tip'>
//               Ничего не найдено
//             </div>
//           ) : (
//             filteredTips.map((tip) => (
//               <div
//                 key={tip}
//                 onClick={() => handleSelect(tip)}
//                 className='tip'
//               >
//                 {tip}
//               </div>
//             ))
//           )}
//         </div>
//       )}
      
//       {/* Закрытие при клике вне области */}
//       {isOpen && (
//         <div
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             zIndex: 999
//           }}
//           onClick={() => setIsOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default Input