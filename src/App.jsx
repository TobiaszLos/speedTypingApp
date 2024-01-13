import React, { useState, useEffect } from 'react'
import { Word } from './components/Word'
import myText from './text.json' // Adjust the path based on your project structure
import { StatisticsCard } from './components/StatisticsCard '

const textJson = [...myText.text]
import { useRandomElement } from './hooks/useRandomElement'

export default function App() {
  const [text, setText] = useState(textJson[0])
  const [inputState, setInputState] = useState('')
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [correctWords, setCorrectWords] = useState(0)
  const [incorrectWords, setIncorrectWords] = useState(0)
  const [isTestRunning, setIsTestRunning] = useState(false)
  const [seconds, setSeconds] = useState(0)

  const [currentWord, setCurrentWord] = useState('')

  // custom hook
  const { getRandomElementFromArray } = useRandomElement(textJson)

  useEffect(() => {
    setText(getRandomElementFromArray())
  }, [])

  useEffect(() => {
    let intervalId

    if (isTestRunning) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds >= 10) {
            setEndTime(new Date())
            setIsTestRunning(false)
            return prevSeconds
          }
          return prevSeconds + 1
        })
      }, 1000)
    }

    return () => clearInterval(intervalId)
  }, [isTestRunning])

  const handleStart = () => {
    startTest()
  }

  const resetTest = () => {
    setSeconds(0)
    setStartTime(null)
    setEndTime(null)
    setCorrectWords(0)
    setIncorrectWords(0)
    setCurrentWordIndex(0)
    setInputState('')
    setIsTestRunning(false)
  }

  const startTest = () => {
    resetTest()

    setStartTime(new Date())
    setIsTestRunning(true)
    setCurrentWordIndex(0)
  }

  const inputChange = (e) => {
    setInputState(e.target.value)
  }

  const inputKeyUp = (e) => {
    if (e.keyCode === 32) {
      const currentWord = inputState.trim()
      if (currentWord.length > 0) {
        const targetWord = text.split(' ')[currentWordIndex].trim()

        if (currentWord === targetWord) {
          setCorrectWords((prevCorrectWords) => prevCorrectWords + 1)
        }

        if (currentWord !== targetWord) {
          setIncorrectWords((prevIncorrectWords) => prevIncorrectWords + 1)
        }

        setCurrentWordIndex((prevIndex) => prevIndex + 1)
        setCurrentWord(inputState) // TO PREVENT RERENDERING WORD COMPONENT AFTER CHANGING INPUT VALUE

        setInputState('')
      }

      if (currentWordIndex === text.split(' ').length - 1) {
        setText(getRandomElementFromArray())
        setCurrentWordIndex(0)
      }
    }
  }

  const calculateWordsPerMinute = () => {
    console.log(';stat', startTime, 'end ', endTime)
    if (startTime && endTime) {
      const minutes = (endTime - startTime) / 60000 // convert milliseconds to minutes
      const wordsPerMinute = Math.round(
        (correctWords + incorrectWords) / minutes
      )
      return wordsPerMinute
    }
    return 0
  }

  const calculateAccuracy = () => {
    console.log(correctWords, '+', incorrectWords)

    const totalWords = correctWords + incorrectWords
    const accuracy = (correctWords / totalWords) * 100
    return accuracy.toFixed(2)
  }

  return (
    <div className="mt-14 flex flex-col gap-8 items-center">
      <div className=" w-[600px]">
        {text.split(' ').map((item, index) => (
          <Word
            key={item + index}
            name={item}
            index={index}
            currentWordIndex={currentWordIndex}
            currentWord={currentWord}
            isTestRunning={isTestRunning}
          />
        ))}
      </div>
      <div className="flex flex-col">
        <input
          type="text"
          className="border"
          onChange={inputChange}
          onKeyUp={inputKeyUp}
          value={inputState}
          disabled={!isTestRunning}
        />
      </div>
      <div className=" bg-slate-700 p-2 border rounded-md text-white">
        {seconds} / {`60s`}
      </div>
      {isTestRunning ? (
        <button
          className="border border-red-800 py-1 px-6 rounded font-semibold"
          onClick={resetTest}
        >
          Reset
        </button>
      ) : (
        <button
          className="border border-green-800 py-1 px-6 rounded font-semibold"
          onClick={handleStart}
        >
          Start Test
        </button>
      )}
      {endTime && (
        <div className="flex justify-center items-center ">
          <StatisticsCard
            wordsPerMinute={calculateWordsPerMinute}
            accuracy={calculateAccuracy}
            correctWords={correctWords}
            incorrectWords={incorrectWords}
          />
        </div>
      )}
    </div>
  )
}
