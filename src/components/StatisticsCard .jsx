import React from 'react';

export const StatisticsCard = ({ wordsPerMinute, accuracy, correctWords, incorrectWords }) => {
  return (
    <div className="bg-blue-200 shadow-lg rounded-lg p-6 m-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-black">Statistics</h2>
      <div className="mb-4">
        <p className="text-blue-800 font-semibold">WPM: {wordsPerMinute()}</p>
        <p className="text-blue-800 font-semibold">Accuracy: {accuracy()}%</p>
        <p className="text-green-600 font-semibold">Correct words: {correctWords}</p>
        <p className="text-red-600 font-semibold">Incorrect words: {incorrectWords}</p>
      </div>
    </div>
  );
};

export default StatisticsCard;
