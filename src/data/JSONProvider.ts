import { type Library } from '../model/book'
import library from './books.json'

const books: Library = library as Library

export function getLibrary (): Library {
  return books
}
