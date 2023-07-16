import { BookGrid } from './components/BookGrid/BookGrid'
import { BookList } from './components/BookList/BookList'
import { type BooksDristribution } from './model/book'
import BookService from './services/books'
import styles from './App.module.css'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useEffect } from 'react'

function getBooksDistribution (): BooksDristribution {
  return {
    library: new BookService().getBooks().library,
    bookList: []
  }
}

export const App: React.FC = () => {
  const [allBooks, setAllBooks] = useLocalStorage('bookData', getBooksDistribution())

  useEffect(() => {
    const handleStorageChange = (): void => {
      const item = window.localStorage.getItem('bookData')
      if (item !== null) {
        setAllBooks(JSON.parse(item))
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return (
    <main
      className={styles.main}
    >
      <BookGrid library={allBooks} setBookList={setAllBooks} />
      <BookList bookList={allBooks} setBookList={setAllBooks} />
    </main>
  )
}
