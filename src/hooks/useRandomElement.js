import { useState } from 'react';

export const useRandomElement = (originalArray) => {
  const [usedIndices, setUsedIndices] = useState([]);

  const getRandomUniqueIndex = () => {
    let randomIndex;

    do {
      randomIndex = Math.floor(Math.random() * originalArray.length);
    } while (usedIndices.includes(randomIndex));

    setUsedIndices([...usedIndices, randomIndex]);

    if (usedIndices.length === originalArray.length) {
      // If all indices are used, reset the usedIndices array
      setUsedIndices([]);
    }

    return randomIndex;
  };

  const getRandomElementFromArray = () => {
    const randomIndex = getRandomUniqueIndex();
    return originalArray[randomIndex];
  };

  return {getRandomElementFromArray, getRandomUniqueIndex};
};