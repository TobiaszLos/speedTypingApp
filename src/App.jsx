import React, { useState, useEffect } from 'react'
import { Word } from './components/Word'
import myText from './text.json' // Adjust the path based on your project structure
import { StatisticsCard } from './components/StatisticsCard '

const textJson = [...myText.text]
import { useRandomElement } from './hooks/useRandomElement'
import Button from './components/Button'
import Input from './components/Input'
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

  const { getRandomElementFromArray } = useRandomElement(textJson)

  useEffect(() => {
    setText(getRandomElementFromArray())
  }, [])

  useEffect(() => {
    let intervalId

    if (isTestRunning) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds >= 60) {
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
    const totalWords = correctWords + incorrectWords
    const accuracy = (correctWords / totalWords) * 100
    return accuracy.toFixed(2)
  }

  return (
    <div className="mt-14 flex flex-col gap-8 items-center">

   <h1 className='text-3xl drop-shadow-lg pb-8'>Speed Typing App</h1>

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
        <Input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg font-medium rounded-lg py-1 px-4 "
          onChange={inputChange}
          onKeyUp={inputKeyUp}
          placeholder={`${text.split(' ')[currentWordIndex]}`}
          value={inputState}
          disabled={!isTestRunning}
        />
      </div>
      <div className=" bg-slate-700 p-2 border rounded-md text-white">
        {seconds} / {`60s`}
      </div>
      {isTestRunning ? (
        <Button
          type={'secondary'}
          onClick={resetTest}
        >
          Reset
        </Button>
      ) : (
        <Button
          type={'primary'}
          onClick={handleStart}
        >
          Start Test
        </Button>
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
