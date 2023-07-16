import { getLibrary } from '../data/JSONProvider'
import { type Library } from '../model/book'
import { type IBookService } from '../model/bookservice'

export default class BookService implements IBookService {
  private readonly books = getLibrary()

  public getBooks (): Library {
    return this.books
  }

  public getGeneres (): string[] {
    const allGeneres = this.books.library.map(book => book.book.genre)
    return Array.from(new Set(allGeneres))
  }
}
