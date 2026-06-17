import { useState } from 'react'
import './App.css'
import Flashcard from './components/Flashcard'

const flashcards = [
  {
    question: 'What is a game engine?',
    answer: 'A game engine is software used to build and run video games.',
    category: 'Easy'
  },
  {
    question: 'What is a sprite?',
    answer: 'A sprite is a 2D image or animation used to represent entities in a game',
    category: 'Easy'
  },
  {
    question: 'What is collision detection?',
    answer: 'Collision detection checks when two objects touch or overlap.',
    category: 'Medium'
  },
  {
    question: 'What is a game loop?',
    answer: 'A game loop repeatedly updates the game state and redraws the screen while the game is running.',
    category: 'Medium'
  },
  {
    question: 'What is a hitbox?',
    answer: 'A hitbox is an invisible shape used to detect collisions.',
    category: 'Easy'
  },
  {
    question: 'What does FPS stand for in game development?',
    answer: 'FPS usually means frames per second, which measures how many images the game displays each second.',
    category: 'Easy'
  },
  {
    question: 'What is pathfinding?',
    answer: 'Pathfinding is the process of finding a route for a character or enemy to move from one point to another.',
    category: 'Hard'
  },
  {
    question: 'What is a physics engine?',
    answer: 'A physics engine simulates real-world behavior like gravity, velocity, collisions, and forces.',
    category: 'Medium'
  },
  {
    question: 'What is procedural generation?',
    answer: 'Procedural generation creates game content automatically using rules or algorithms.',
    category: 'Hard'
  },
  {
    question: 'What is a prefab in Unity?',
    answer: 'A prefab is a reusable game object template that can be placed many times throughout a Unity project.',
    category: 'Medium'
  }
]

function App() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  const currentCard = flashcards[currentCardIndex]

  function flipCard() {
    setIsFlipped(!isFlipped)
  }

  function getRandomCard() {
    let randomIndex = currentCardIndex

    while (randomIndex === currentCardIndex) {
      randomIndex = Math.floor(Math.random() * flashcards.length)
    }

    setCurrentCardIndex(randomIndex)
    setIsFlipped(false)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Game Dev Flashcards</h1>
        <p>
          Study important game development terms by flipping through random flashcards.
        </p>
        <h3>Total Cards: {flashcards.length}</h3>
      </header>

      <main className="flashcard-section">
        <Flashcard
          card={currentCard}
          isFlipped={isFlipped}
          onCardClick={flipCard}
        />

        <button className="next-button" onClick={getRandomCard}>
          Next Random Card
        </button>
      </main>
    </div>
  )
}

export default App