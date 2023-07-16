import styles from './list.module.css'
import { type BooksDristribution } from '../../model/book'
import { BookCard } from '../BookCard/BookCard'

interface ListProps {
  bookList: BooksDristribution
  setBookList: (value: BooksDristribution) => void
}

export const BookList: React.FC<ListProps> = ({ bookList, setBookList }) => {
  function handleDrop (e: React.DragEvent<HTMLButtonElement>): void {
    const ISBNBook = e.dataTransfer.getData('text/plain')
    console.log('Se ha soltado el libro', ISBNBook)
    if (bookList.bookList.some(book => book.book.ISBN === ISBNBook)) return
    toggleBook(e.dataTransfer.getData('text/plain'))
  }

  function toggleBook (toggleISBN: string): void {
    const prevState = bookList
    const bookTarget = prevState.library.filter(book => book?.book?.ISBN === toggleISBN)[0]
    setBookList(
      {
        library: prevState.library.filter(book => book?.book?.ISBN !== bookTarget?.book.ISBN),
        bookList: [...prevState.bookList, bookTarget]
      }
    )
  }

  return (
    <aside
      className={styles.list}
      onDrop={handleDrop}
      onDragOver={e => { e.preventDefault() }}
    >
      {bookList.bookList?.map(book => <BookCard key={book.book.ISBN} book={book.book} />)}
    </aside>
  )
}
