import { bookOne } from "../mocks/booksMOCK"
import { InputField } from "@/components/InputField"
import  ValidationField  from "@/validation/ValidationField"
import { ValidationMessage } from "@/validation/validationMessage"
import { Book } from "@/model/book"
import { useState } from "react"
import { BookGender } from "@/types/bookGender"
import { GenericCombobox } from "@/components/GenericComboBox"
import { Languages } from "@/types/languages"
import { BookCondition } from "@/types/bookCondition"



 export default function EditBook() {
  //const book = bookOne
  const [errors, setErrors] = useState<Array<ValidationMessage>>([])
  const [book, setBook] = useState<Book>(bookOne)

  const updateBook = (key: keyof Book, value: unknown) => {
   setBook(prev => Object.assign(new Book(), prev, { [key]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ================ Breadcrumb ================ */}
      <div className="px-6 py-3">
        <ol className="flex items-center gap-1 text-sm text-gray-500">
          <li>
            <a href="./" className="hover:text-gray-700">
              Mis Libros
            </a>
          </li>
          <li>
            <svg
              className="mx-1 inline h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9 18 6-6-6-6"
              />
            </svg>
          </li>
          <li className="font-medium text-gray-700">Editar Libro</li>
        </ol>
      </div>

      {/* ================ Top Section ================ */}
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8">
        <div className="flex items-start gap-6">
          <div className="flex w-64 shrink-0 flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <img
              src={book.imageSrc}
              alt={book.title}
              className="h-78 w-64 rounded-xl object-cover shadow-md"
            />
            
          </div>
        
        <div className="flex flex-1 flex-col gap-4">
            <div className="gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-l border-b border-gray-100 font-bold text-gray-900">
                Detalles del Libro
              </h2>
              <div>
                <InputField 
                       label="Titulo"
                       id="title"
                       type="title"
                       required
                       value={book.title}
                />
                <ValidationField field="title" errors={errors} />
                <InputField 
                       label="Tipo"
                       id="type"
                       type="tyoe"
                       required
                       value={book.bookType}
                      />
                      <ValidationField field="title" errors={errors} />
              </div>
              {/* dos columnas   */}
              {/* fila 1 genero - autor   */}
              <div className="grid grid-cols-6 gap-4 py-2">
                <div className="col-start-1 col-end-4">
                  <span >
                    <div>
                      <GenericCombobox
                        options={Object.values(BookGender)}
                        value={book.gender}
                        onChange={(v: BookGender | null) => updateBook('gender', v)}
                        placeholder="Buscar género..."
                        label="Género"
                      />
                    </div>
                  </span>
                </div>
                <div className="col-start-4 col-end-7">
                  <span >
                    <div>
                      <InputField 
                        label="Autor"
                        id="author"
                        type="author"
                        required
                        value={book.author.name}
                      />
                      <ValidationField field="author" errors={errors} />
                    </div>
                  </span>
                </div>
              </div> 
              {/* fin fila */}
              {/* fila 2 idioma - estado   */}
              <div className="grid grid-cols-6 gap-4 py-2">
                <div className="col-start-1 col-end-4">
                  <span >
                    <div>
                      <GenericCombobox
                        options={Object.values(Languages)}
                        value={book.language}
                        onChange={(v: Languages | null) => updateBook('language', v)}
                        placeholder="Buscar Idioma..."
                        label="Idioma"
                      />
                    </div>
                  </span>
                </div>
                <div className="col-start-4 col-end-7">
                  <span >
                    <div>
                      <GenericCombobox
                        options={Object.values(BookCondition)}
                        value={book.condition}
                        onChange={(v: BookCondition | null) => updateBook('condition', v)}
                        placeholder="Seleccionar Estado"
                        label="Estado"
                      />
                    </div>
                  </span>
                </div>
              </div> 
              {/* fin fila */}
              {/* fila 2 editorial - fecha de publicacion   */}
              <div className="grid grid-cols-6 gap-4 py-2">
                <div className="col-start-1 col-end-4">
                  <span >
                    <div>
                      <InputField 
                       label="Editorial"
                       id="editorial"
                       type="editorial"
                       required
                       value={book.editorial}
                      />
                      <ValidationField field="editorial" errors={errors} />
                    </div>
                  </span>
                </div>
                <div className="col-start-4 col-end-7">
                  <span >
                    <div>
                      <InputField 
                        label="Fecha de publicacion"
                        id="publishDate"
                        type="publishDate"
                        required
                        // todo lo que sigue a ? es para transformar al tipo de fecha que acepta el inputfield
                        value={book.publishDate ? new Date(book.publishDate).toISOString().split('T')[0] : ''}
                      />
                      <ValidationField field="publishDate" errors={errors} />
                    </div>
                  </span>
                </div>
              </div> 
              {/* fin fila */}
              {/* fila 3 cantidad de paginas - ISBN   */}
              <div className="grid grid-cols-6 gap-4 py-2">
                <div className="col-start-1 col-end-4">
                  <span >
                    <div>
                      <InputField 
                       label="Cantidad de páginas"
                       id="pages"
                       type="pages"
                       required
                       value={book.pages}
                      />
                      <ValidationField field="pages" errors={errors} />
                    </div>
                  </span>
                </div>
                <div className="col-start-4 col-end-7">
                  <span >
                    <div>
                      <InputField 
                        label="ISBN"
                        id="ISBN"
                        type="ISBN"
                        required
                        value={book.ISBN}
                      />
                      <ValidationField field="ISBN" errors={errors} />
                    </div>
                  </span>
                </div>
              </div> 
              {/* fin fila */}
              <div>
                <InputField 
                       label="Descripción"
                       id="desc"
                       type="desc"
                       required
                       value={book.desc}
                />
                <ValidationField field="desc" errors={errors} />
              </div>
          </div>
          </div>

        </div>
</div>

          
        
</div>
)}
