import React, { useState } from 'react';
import { CLASS_LIST } from '../consts.js';

function Classes({ attributes }) {
  const [clickedClass, setClickedClass] = useState('');

  const checkRequirements = (classAttributes) => {
    for (let key in classAttributes) {
      if (attributes[key] < classAttributes[key]) {
        return false;
      }
    }
    return true;
  };

  const handleClick = (className) => {
    if (clickedClass === className) {
      setClickedClass(''); // hide the attributes if the same class is clicked again
    } else {
      setClickedClass(className);
    }
  };

  return (
    <div>
      <h2>Classes</h2>
      {Object.entries(CLASS_LIST).map(([className, classAttributes]) => (
        <div
          key={className}
          style={{
            backgroundColor: checkRequirements(classAttributes) ? 'green' : 'grey',
            padding: '10px',
            margin: '5px',
            borderRadius: '5px',
          }}
          onClick={() => handleClick(className)}
        >
          <h3>{className}</h3>
          {clickedClass === className && (
            <ul>
              {Object.entries(classAttributes).map(([attribute, value]) => (
                <li key={attribute}>
                  {attribute}: {value}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default Classes;
