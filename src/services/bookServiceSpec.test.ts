
import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { bookService } from './bookService'
import { Book } from '@/model/book'
import { Author } from '@/model/author'
import { BookType } from '@/types/bookType'
import { BookGender } from '@/types/bookGender'
import { Languages } from '@/types/languages'
import { BookCondition } from '@/types/bookCondition'
//para correrlo pnpm exec vitest run

vi.mock('@/context/AuthContext', () => ({
  getId: () => '1'
}))

const mockedPost = vi.spyOn(axios, 'post')
const mockedPut = vi.spyOn(axios, 'put')
const mockedDelete = vi.spyOn(axios, 'delete')

const mockBook = new Book(
  1,
  'El Principito',
  BookType.Common,
  'Un libro hermoso',
  BookGender.DRAMA,
  new Author(1, 'Antoine de Saint-Exupéry', ''),
  100,
  '978-0-306-40615-7',
  Languages.SPANISH,
  'Planeta',
  new Date('2000-01-01'),
  BookCondition.GOOD,
  'imagen.jpg',
)

describe('BookService', () => {

  beforeEach(() => {
    vi.clearAllMocks()
  })

  // =================== createBook ===================
  describe('createBook', () => {
    it('debería llamar al endpoint correcto al crear un libro', async () => {
      mockedPost.mockResolvedValue({ status: 200, data: mockBook })

      await bookService.createBook(mockBook)

      expect(mockedPost).toHaveBeenCalledWith(
        expect.stringContaining('/crear-libro'),
        expect.objectContaining({ title: 'El Principito' })
      )
    })

    it('debería retornar el libro creado', async () => {
      mockedPost.mockResolvedValue({ status: 200, data: mockBook })

      const result = await bookService.createBook(mockBook)

      expect(result).toEqual(mockBook)
    })

    it('debería lanzar un error si falla la creación', async () => {
      mockedPost.mockRejectedValue(new Error('Error al crear libro'))

      await expect(bookService.createBook(mockBook))
        .rejects.toThrow('Error al crear libro')
    })
  })

  // =================== updateBook ===================
  describe('updateBook', () => {
    it('debería llamar al endpoint correcto al actualizar un libro', async () => {
      mockedPut.mockResolvedValue({ status: 200, data: mockBook })

      await bookService.updateBook(1, mockBook)

      expect(mockedPut).toHaveBeenCalledWith(
        expect.stringContaining('/editar-libro/1'),
        expect.objectContaining({ title: 'El Principito' })
      )
    })

    it('debería retornar el libro actualizado', async () => {
      mockedPut.mockResolvedValue({ status: 200, data: mockBook })

      const result = await bookService.updateBook(1, mockBook)

      expect(result).toEqual(mockBook)
    })

    it('debería lanzar un error si falla la actualización', async () => {
      mockedPut.mockRejectedValue(new Error('Error al actualizar libro'))

      await expect(bookService.updateBook(1, mockBook))
        .rejects.toThrow('Error al actualizar libro')
    })
  })

  // =================== deleteBook ===================
  describe('deleteBook', () => {
    it('debería llamar al endpoint correcto al eliminar un libro', async () => {
      mockedDelete.mockResolvedValue({ status: 200, data: undefined })

      await bookService.deleteBook(1)

      expect(mockedDelete).toHaveBeenCalledWith(
        expect.stringContaining('/eliminar-libro/1')
      )
    })

    it('debería lanzar un error si falla la eliminación', async () => {
      mockedDelete.mockRejectedValue(new Error('Error al eliminar libro'))

      await expect(bookService.deleteBook(1))
        .rejects.toThrow('Error al eliminar libro')
    })
  })
})

// =================== Book.validate() ===================
describe('Book.validate()', () => {
  it('no debería tener errores con un libro válido', () => {
    const errors = mockBook.validate()
    expect(errors).toHaveLength(0)
  })

  it('debería requerir el título', () => {
    const book = new Book(0, '')
    const errors = book.validate()
    expect(errors.some(e => e.field === 'title')).toBe(true)
  })

  it('debería requerir la descripción', () => {
    const book = new Book(0, 'Titulo', BookType.Common, '')
    const errors = book.validate()
    expect(errors.some(e => e.field === 'desc')).toBe(true)
  })

  it('debería requerir el autor', () => {
    const book = new Book(0, 'Titulo', BookType.Common, 'Desc', BookGender.DRAMA, new Author(0, '', ''))
    const errors = book.validate()
    expect(errors.some(e => e.field === 'author')).toBe(true)
  })

  it('debería requerir páginas mayor a 0', () => {
    const book = new Book(0, 'Titulo', BookType.Common, 'Desc', BookGender.DRAMA, new Author(1, 'Autor', ''), 0)
    const errors = book.validate()
    expect(errors.some(e => e.field === 'numPages')).toBe(true)
  })

  it('debería requerir el ISBN', () => {
    const book = new Book(0, 'Titulo', BookType.Common, 'Desc', BookGender.DRAMA, new Author(1, 'Autor', ''), 100, '')
    const errors = book.validate()
    expect(errors.some(e => e.field === 'isbn')).toBe(true)
  })

  it('debería requerir la editorial', () => {
    const book = new Book(0, 'Titulo', BookType.Common, 'Desc', BookGender.DRAMA, new Author(1, 'Autor', ''), 100, '978-123', Languages.SPANISH, '')
    const errors = book.validate()
    expect(errors.some(e => e.field === 'editorial')).toBe(true)
  })
})