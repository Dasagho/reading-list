import { useState } from 'react'
import { type BooksDristribution } from '../../model/book'
import BookService from '../../services/books'
import { BookCard } from '../BookCard/BookCard'
import styles from './grid.module.css'

interface GridProps {
  library: BooksDristribution
  setBookList: (value: BooksDristribution) => void
}

const bookService = new BookService()

export const BookGrid: React.FC<GridProps> = ({ library, setBookList }) => {
  const [genere, setGenere] = useState('')
  function handleDrop (e: React.DragEvent<HTMLButtonElement>): void {
    const ISBNBook = e.dataTransfer.getData('text/plain')
    if (library.library.some(book => book.book.ISBN === ISBNBook)) return
    toggleBook(e.dataTransfer.getData('text/plain'))
  }

  function toggleBook (toggleISBN: string): void {
    const prevState = library
    const bookTarget = prevState.bookList.filter(book => book.book.ISBN === toggleISBN)[0]
    setBookList(
      {
        library: [...prevState.library, bookTarget],
        bookList: prevState.bookList.filter(book => book?.book.ISBN !== bookTarget?.book.ISBN)
      }
    )
  }

  const availableBooks = library.library
    ?.filter(book => genere === '' || book.book.genre === genere)

  return (
    <section
      className={styles.grid}
      onDrop={handleDrop}
      onDragOver={e => { e.preventDefault() }}
    >
      <header
        className={styles.header}
      >
        Libros disponibles: {availableBooks.length} de {library.library.length}<br />
        Libros en la lista: {library.bookList.length}
        <select name="genere" id="" value={genere} onChange={e => { setGenere(e.target.value) }}>
          <option value="">Selecciona un género</option>
          { bookService.getGeneres().map(genere => <option key={genere}>{genere}</option>) }
        </select>
      </header>
      {
        availableBooks?.map(book =>
            <BookCard book={book.book} key={book.book.ISBN} />
        )
      }
    </section>
  )
}
