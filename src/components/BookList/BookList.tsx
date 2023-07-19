import styles from './list.module.css'
import { type LibraryElement } from '../../model/book'
import { BookCard } from '../BookCard/BookCard'

interface ListProps {
  bookList: LibraryElement[]
  toggleBook: (toggleISBN: string) => void
}

export const BookList: React.FC<ListProps> = ({ bookList, toggleBook }) => {
  function handleDrop (e: React.DragEvent<HTMLButtonElement>): void {
    const ISBNBook = e.dataTransfer.getData('text/plain')
    if (bookList.some(book => book.book.ISBN === ISBNBook)) return
    toggleBook(e.dataTransfer.getData('text/plain'))
  }

  return (
    <aside
      className={styles.list}
      onDrop={handleDrop}
      onDragOver={e => { e.preventDefault() }}
    >
      {bookList?.map(book => <BookCard key={book.book.ISBN} book={book.book} toggleBook={toggleBook} />)}
    </aside>
  )
}
