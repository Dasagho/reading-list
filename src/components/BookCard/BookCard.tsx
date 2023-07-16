import { type Book } from '../../model/book'
import style from './card.module.css'

interface CardProps {
  book: Book
}

function handleDragStart (e: React.DragEvent<HTMLButtonElement>): void {
  const ISBN = e.currentTarget.getAttribute('data-isbn')
  if (ISBN === null) return
  e.dataTransfer.setData('text/plain', ISBN)
}

export const BookCard: React.FC<CardProps> = ({ book }) => {
  const { cover, ISBN } = book
  return (
    <button
      className={style.card}
      draggable={true}
      onDragStart={handleDragStart}
    >
      <img src={cover} alt="Book cover" data-isbn={ISBN} />
    </button>
  )
}
