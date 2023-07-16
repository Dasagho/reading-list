import { type Library } from './book'

export interface IBookService {
  getBooks: () => Library
  getGeneres: () => string[]
}
