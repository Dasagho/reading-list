import { type Book } from '../../model/book'
import style from './card.module.css'

interface CardProps {
  book: Book
}

function handleDragStart (e: React.DragEvent<HTMLButtonElement>): void {
  console.log('Estoy siendo arrastrado', e.target.getAttribute('data-isbn'))
  e.dataTransfer.setData('text/plain', e.target.getAttribute('data-isbn'))
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
