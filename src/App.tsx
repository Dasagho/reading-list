import { BookGrid } from './components/BookGrid/BookGrid'
import { BookList } from './components/BookList/BookList'
import styles from './App.module.css'
import { useEffect } from 'react'
import { useBooks } from './hooks/useBooks'

export const App: React.FC = () => {
  const { bookList, library, toggleBook, reOrderBook } = useBooks()

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
      <BookGrid library={library} toggleBook={toggleBook} bookList={bookList} reOrderCallBack={reOrderBook} />
      <BookList bookList={bookList} toggleBook={toggleBook} reOrderCallBack={reOrderBook} />
    </main>
  )
}
