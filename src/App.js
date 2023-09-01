import { useState, useEffect } from 'react';
import './App.css';
import Attributes from './components/Attributes.js';
import Classes from './components/Classes';
import Skills from './components/Skills';
import { SKILL_LIST } from './consts';

import { postCharacter, getCharacter } from './api';

function App() {
  const [character, setCharacter] = useState({
    attributes: {
      Strength: 0,
      Dexterity: 0,
      Constitution: 0,
      Intelligence: 0,
      Wisdom: 0,
      Charisma: 0,
    },
    skills: Object.fromEntries(SKILL_LIST.map((skill) => [skill.name, 0])),
    intelligenceModifier: 0,
    totalSkillPoints: 0,
    pointsSpent: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCharacter();
        setCharacter(prevState => ({
          ...prevState,
          attributes: data.body.attributes,
          skills: data.body.skills
        }));
        // console.log(data)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  // Skills calculation logic
  const intelligenceModifier = Math.floor((character.attributes.Intelligence - 10) / 2);
  const totalSkillPoints = 10 + (4 * intelligenceModifier);
  let pointsSpent = 0;
  for (let skill in character.skills) {
    pointsSpent += character.skills[skill];
  }


  const incrementAttribute = (attribute) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      attributes: {
        ...prevCharacter.attributes,
        [attribute]: prevCharacter.attributes[attribute] + 1,
      },
    }));
  };

  const decrementAttribute = (attribute) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      attributes: {
        ...prevCharacter.attributes,
        [attribute]: Math.max(0, prevCharacter.attributes[attribute] - 1),
      },
    }));
  };

  const incrementSkill = (skill) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      skills: {
        ...prevCharacter.skills,
        [skill]: prevCharacter.skills[skill] + 1,
      },
    }));
  };

  const decrementSkill = (skill) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      skills: {
        ...prevCharacter.skills,
        [skill]: Math.max(prevCharacter.skills[skill] - 1, 0),
      },
    }));
  };

  const saveCharacter = () => {
    postCharacter(character)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section" style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <h2>Attributes</h2>
          <Attributes
            attributes={character.attributes}
            incrementAttribute={incrementAttribute}
            decrementAttribute={decrementAttribute}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Classes attributes={character.attributes} />
        </div>
        <div style={{ flex: 1 }}>
          <Skills
            attributes={character.attributes}
            skills={character.skills}
            onSkillIncrement={incrementSkill}
            onSkillDecrement={decrementSkill}
            intelligenceModifier={intelligenceModifier}
            totalSkillPoints={totalSkillPoints}
            pointsSpent={pointsSpent}
          />
        </div>
      </section>
      <button onClick={saveCharacter} className="save_button">Save Character</button>
    </div>
  );
}

export default App;