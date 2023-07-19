import { useState } from 'react'
import { type LibraryElement } from '../../model/book'
import BookService from '../../services/books'
import { BookCard } from '../BookCard/BookCard'
import styles from './grid.module.css'

interface GridProps {
  bookList: LibraryElement[]
  library: LibraryElement[]
  toggleBook: (toogleISBN: string) => void
  reOrderCallBack: (prevISBNBook: string, ISBNBook: string) => void
}

const bookService = new BookService()

export const BookGrid: React.FC<GridProps> = ({ library, bookList, toggleBook, reOrderCallBack }) => {
  const [genere, setGenere] = useState('')
  function handleDrop (e: React.DragEvent<HTMLButtonElement>): void {
    const ISBNBook = e.dataTransfer.getData('text/plain')
    if (library.some(book => book?.book.ISBN === ISBNBook)) return
    toggleBook(e.dataTransfer.getData('text/plain'))
  }

  const availableBooks = library?.filter(book => genere === '' || book?.book.genre === genere)

  return (
    <section
      className={styles.main}
      onDrop={handleDrop}
      onDragOver={e => { e.preventDefault() }}
    >
      <header
        className={styles.header}
      >
        Libros disponibles: {availableBooks.length} de {library.length}<br />
        Libros en la lista: {bookList.length}
        <select name="genere" id="" value={genere} onChange={e => { setGenere(e.target.value) }}>
          <option value="">Selecciona un género</option>
          {bookService.getGeneres().map(genere => <option key={genere}>{genere}</option>)}
        </select>
      </header>
      <main
        className={styles.grid}
      >
        {
          availableBooks?.map(book =>
            <BookCard book={book.book} key={book.book.ISBN} toggleBook={toggleBook} reOrderCallBack={reOrderCallBack} />
          )
        }
      </main>
    </section>
  )
}
