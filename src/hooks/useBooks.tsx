import { type LibraryElement, type BooksDristribution } from '../model/book'
import BookService from '../services/books'
import { useLocalStorage } from './useLocalStorage'

export interface BookHook {
  library: LibraryElement[]
  bookList: LibraryElement[]
  toggleBook: (toggleISBN: string) => void
}

const initialBookDistribution: BooksDristribution = {
  library: new BookService().getBooks().library,
  bookList: []
}

export function useBooks (): BookHook {
  const [allBooks, setAllBooks] = useLocalStorage('bookData', initialBookDistribution)

  function toggleBook (toggleISBN: string): void {
    let newLibrary = allBooks.library
    let newBookList = allBooks.bookList

    const libraryIndex = allBooks.library.findIndex(book => book.book.ISBN === toggleISBN)
    if (libraryIndex !== -1) {
      newLibrary = allBooks.library.filter(book => book.book.ISBN !== toggleISBN)
      newBookList = [...allBooks.bookList, allBooks.library[libraryIndex]]
    }

    const bookListLindex = allBooks.bookList.findIndex(book => book.book.ISBN === toggleISBN)
    if (bookListLindex !== -1) {
      newLibrary = [...allBooks.library, allBooks.bookList[bookListLindex]]
      newBookList = allBooks.bookList.filter(book => book.book.ISBN !== toggleISBN)
    }

    setAllBooks({ library: newLibrary, bookList: newBookList })
  }

  return {
    library: allBooks.library,
    bookList: allBooks.bookList,
    toggleBook
  }
}
