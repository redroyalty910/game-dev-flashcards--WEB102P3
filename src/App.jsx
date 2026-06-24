import { useState } from 'react';
import './App.css';
import Flashcard from './components/Flashcard';

const originalCards = [
  {
    question: 'What is a game engine?',
    answer:
      'A game engine is software used to build and run video games. Popukar examples include Unity, Godot, and Unreal Engine.',
    category: 'Easy',
    acceptedAnswers: ['game engine', 'software used to build games', 'software for making games'],
  },
  {
    question: 'What does a sprite usually represent?',
    answer:
      'A sprite is a 2D image or animation used to represent mostly objects / entites within a video game',
    category: 'Easy',
    acceptedAnswers: ['2d image', '2d animation', 'image in a game', 'game object image', 'sprite'],
  },
  {
    question: 'What is collision detection?',
    answer:
      'Collision detection checks when two objects touch or overlap.',
    category: 'Medium',
    acceptedAnswers: ['objects touching', 'objects overlap', 'collision detection', 'checking collisions'],
  },
  {
    question: 'What is a game loop?',
    answer:
      'A game loop repeatedly updates the game, constantly reloading the screen',
    category: 'Medium',
    acceptedAnswers: ['game loop', 'updates the game repeatedly', 'repeats game logic', 'update and draw loop'],
  },
  {
    question: 'What is a hitbox?',
    answer:
      'A hitbox is an invisible shape used to detect whether something has been hit or touched.',
    category: 'Easy',
    acceptedAnswers: ['invisible shape', 'hitbox', 'detects hits', 'collision box'],
  },
  {
    question: 'What is frame rate?',
    answer:
      'Frame rate is how many frames are shown per second, often refered to as FPS.',
    category: 'Easy',
    acceptedAnswers: ['fps', 'frames per second', 'frame rate'],
  },
  {
    question: 'What is playtesting?',
    answer:
      'Playtesting is when people test a game to find bugs or ways to improve the experience.',
    category: 'Medium',
    acceptedAnswers: ['testing a game', 'playtesting', 'finding bugs', 'testing gameplay'],
  },
  {
    question: 'What is a game mechanic?',
    answer:
      'A game mechanic is a rule or system that controls how the player interacts with the game.',
    category: 'Medium',
    acceptedAnswers: ['game mechanic', 'rule of the game', 'game system', 'player interaction system'],
  },
  {
    question: 'What is pixel art?',
    answer:
      'Pixel art is a digital art style where images are created and edited at the pixel level.',
    category: 'Easy',
    acceptedAnswers: ['pixel art', 'art made with pixels', 'pixel level art'],
  },
  {
    question: 'What is debugging?',
    answer:
      'Debugging is the process of finding and fixing errors or problems within code.',
    category: 'Easy',
    acceptedAnswers: ['fixing code errors', 'debugging', 'finding bugs', 'fixing bugs'],
  },
];

function App() {
  const [cards, setCards] = useState(originalCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [masteredCards, setMasteredCards] = useState([]);

  const currentCard = cards[currentIndex];

  const normalizeAnswer = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .trim();
  };

  const checkAnswer = () => {
    if (guess.trim() === '') {
      setFeedback('empty');
      return;
    }

    const userGuess = normalizeAnswer(guess);

    const isCorrect = currentCard.acceptedAnswers.some((answer) => {
      const acceptedAnswer = normalizeAnswer(answer);

      return (
        userGuess === acceptedAnswer ||
        userGuess.includes(acceptedAnswer) ||
        acceptedAnswer.includes(userGuess)
      );
    });

    if (isCorrect) {
      setFeedback('correct');
      setCurrentStreak((prevStreak) => {
        const newStreak = prevStreak + 1;

        if (newStreak > longestStreak) {
          setLongestStreak(newStreak);
        }

        return newStreak;
      });
    } else {
      setFeedback('incorrect');
      setCurrentStreak(0);
    }
  };

  const resetCardState = () => {
    setIsFlipped(false);
    setGuess('');
    setFeedback('');
  };

  const goToNextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      resetCardState();
    }
  };

  const goToPreviousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      resetCardState();
    }
  };

  const shuffleCards = () => {
    const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setCurrentIndex(0);
    resetCardState();
  };

  const markAsMastered = () => {
    const masteredCard = currentCard;
    const remainingCards = cards.filter((card) => card.question !== masteredCard.question);

    setMasteredCards([...masteredCards, masteredCard]);
    setCards(remainingCards);

    if (remainingCards.length === 0) {
      setCurrentIndex(0);
    } else if (currentIndex >= remainingCards.length) {
      setCurrentIndex(remainingCards.length - 1);
    }

    resetCardState();
  };

  if (cards.length === 0) {
    return (
      <div className="app">
        <div className="complete-card">
          <h1>Game Development Flashcards</h1>
          <h2>Props to you! You mastered every card!</h2>
          <p>Nice work buddy, your study deck is empty now. thanks for interacting with my work!</p>
          <button
            onClick={() => {
              setCards(originalCards);
              setMasteredCards([]);
              setCurrentIndex(0);
              setCurrentStreak(0);
              setLongestStreak(0);
              resetCardState();
            }}
          >
            Restart Deck
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>☆ Game Development Flashcards ☆</h1>
      <h2>These exist to test your knowledge as a game dev! Enter your answers to each question below!</h2>

      <div className="stats">
        <p>Card {currentIndex + 1} of {cards.length}</p>
        <p>Current Streak: {currentStreak}</p>
        <p>Longest Streak: {longestStreak}</p>
        <p>Mastered: {masteredCards.length}</p>
      </div>

      <Flashcard
        card={currentCard}
        isFlipped={isFlipped}
        setIsFlipped={setIsFlipped}
      />

      <div className="guess-section">
        <label htmlFor="guess-input">Enter your guess:</label>

        <input
          id="guess-input"
          type="text"
          value={guess}
          placeholder="Type your answer here..."
          onChange={(event) => setGuess(event.target.value)}
        />

        <button onClick={checkAnswer}>Submit Guess</button>

        {feedback === 'correct' && <p className="feedback correct">Correct!</p>}
        {feedback === 'incorrect' && <p className="feedback incorrect">WRONG, try again!</p>}
        {feedback === 'empty' && <p className="feedback empty">type a guess, first.</p>}
      </div>

      <div className="button-row">
        <button
          onClick={goToPreviousCard}
          disabled={currentIndex === 0}
          className={currentIndex === 0 ? 'disabled-button' : ''}
        >
          Back
        </button>

        <button onClick={shuffleCards}>Shuffle</button>

        <button onClick={markAsMastered}>Mark as Mastered</button>

        <button
          onClick={goToNextCard}
          disabled={currentIndex === cards.length - 1}
          className={currentIndex === cards.length - 1 ? 'disabled-button' : ''}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;