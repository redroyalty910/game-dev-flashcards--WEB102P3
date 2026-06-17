function Flashcard({ card, isFlipped, onCardClick }) {
  return (
    <div
      className={`flashcard ${card.category.toLowerCase()} ${isFlipped ? 'flipped' : ''}`}
      onClick={onCardClick}
    >
      <p className="category">{card.category}</p>

      <h2>{isFlipped ? 'Answer' : 'Question'}</h2>

      <p className="card-text">
        {isFlipped ? card.answer : card.question}
      </p>

      <p className="hint">
        Click the card to flip it.
      </p>
    </div>
  )
}

export default Flashcard