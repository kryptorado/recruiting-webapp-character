import React from 'react';
import { ATTRIBUTE_LIST } from './../consts.js';

function Attributes({ attributes, incrementAttribute, decrementAttribute }) {
  const calculateModifier = (value) => {
    return Math.floor((value - 10) / 2);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Value</th>
            <th>Modifier</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ATTRIBUTE_LIST.map((attribute) => (
            <tr key={attribute}>
              <td>{attribute}</td>
              <td>{attributes[attribute]}</td>
              <td>{calculateModifier(attributes[attribute])}</td>
              <td>
                <button onClick={() => incrementAttribute(attribute)}>+</button>
                <button onClick={() => decrementAttribute(attribute)}>-</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Attributes;

