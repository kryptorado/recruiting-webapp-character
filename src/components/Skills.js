import React from 'react';
import { SKILL_LIST } from './../consts.js';

function Skills({ attributes, skills, onSkillIncrement, onSkillDecrement, intelligenceModifier, totalSkillPoints, pointsSpent }) {
  const renderRows = () => {
    const rows = [];
    for (let i = 0; i < SKILL_LIST.length; i++) {
      const skill = SKILL_LIST[i];
      const attributeModifier = Math.floor((attributes[skill.attributeModifier] - 10) / 2);
      const total = skills[skill.name] + attributeModifier;

      rows.push(
        <tr key={skill.name}>
          <td>{skill.name}</td>
          <td>{skills[skill.name]}</td>
          <td>{attributeModifier}</td>
          <td>{total}</td>
          <td>
            <button onClick={() => onSkillIncrement(skill.name)} disabled={pointsSpent >= totalSkillPoints}>+</button>
            <button onClick={() => onSkillDecrement(skill.name)} disabled={skills[skill.name] === 0}>-</button>
          </td>
        </tr>
      );
    }

    return rows;
  };

  return (
    <div>
      <h2>Skills</h2>
      <p>Total Points: {totalSkillPoints}</p>
      <p>Points Spent: {pointsSpent}</p>
      <table>
        <thead>
          <tr>
            <th>Skill</th>
            <th>Points</th>
            <th>Modifier</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {renderRows()}
        </tbody>
      </table>
    </div>
  );
}

export default Skills;