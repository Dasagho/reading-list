import { type Book } from '../../model/book'
import style from './card.module.css'

interface CardProps {
  book: Book
  toggleBook: (toggleISBN: string) => void
}

function handleDragStart (e: React.DragEvent<HTMLButtonElement>): void {
  const ISBN = e.currentTarget.getAttribute('data-isbn')
  if (ISBN === null) return
  e.dataTransfer.setData('text/plain', ISBN)
}

export const BookCard: React.FC<CardProps> = ({ book, toggleBook }) => {
  const { cover, ISBN } = book

  function handleClick (): void {
    toggleBook(ISBN)
  }

  return (
    <button
      data-isbn={ISBN}
      className={style.card}
      draggable={true}
      onDragStart={handleDragStart}
    >
      <img src={cover} alt="Book cover" data-isbn={ISBN} onClick={handleClick} />
    </button>
  )
}
