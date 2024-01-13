import { useEffect, useState } from 'react'

export const Word = ({
  name,
  index,
  currentWordIndex,
  currentWord,
  isTestRunning,
}) => {
  const [color, setColor] = useState('text-gray-500')
  const [border, setBorder] = useState('border-none')

  useEffect(() => {
    const handleColors = () => {
      if (index === currentWordIndex - 1) {
        if (currentWord.trim() === name.trim()) {
          setColor('text-green-400')
        } else if (currentWord.trim() !== name.trim()) {
          setColor('text-red-400')
        }
      }
    }
    handleColors()
  }, [currentWord])

  useEffect(() => {
    const handleBorder = () => {
      if (index === currentWordIndex) {
        setBorder('border-2 border-cyan-600')
      } else {
        setBorder('border-none')
      }
    }
    handleBorder()
  }, [currentWordIndex])

  useEffect(() => {
    setColor('text-gray-500')
  }, [isTestRunning])

  return <span className={`${color} ${border}  p-1 rounded`}>{name} </span>
}
