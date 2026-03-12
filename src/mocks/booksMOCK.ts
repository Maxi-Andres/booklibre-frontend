import { Book } from "@/model/book";
import { BookReview } from "@/model/bookReview";
import { UserProfile } from "@/model/userProfile";
import { BookCondition } from "@/types/bookCondition";
import { BookGender } from "@/types/bookGender";
import { BookType } from "@/types/bookType";
import { Languages } from "@/types/languages";

const reviewOne : BookReview = new BookReview(4)
const reviewTwo : BookReview = new BookReview(5)
const reviewThree : BookReview = new BookReview(5)

const bookOne : Book = new Book(
  /* id: */ 1,
  /* title: */ 'La Biblioteca de la Medianoche',
  /* bookType: */ BookType.Common,
  /* desc: */ "",
  /* gender: */ BookGender.SciencieFiction,
  /* author: */ "Matt Haig",
  /* pages: */ 288,
  /* ISBN: */ "9780525559474",
  /* language: */ Languages.Spanish,
  /* editorial: */ "Penguin",
  /* publishDate: */ new Date(2020, 8, 13),
  /* condition: */ BookCondition.Good,
  /* reviews: */ [reviewOne,reviewTwo,reviewThree],
  /* imageSrc: */ 'https://perireads.com/wp-content/uploads/2021/12/The-Midnight-Library-Feature.jpg',
  /* owner: */ new UserProfile("MariaBelen")
)

const bookTwo : Book = new Book(
  /* id: */ 2,
  /* title: */ 'Una Educación',
  /* bookType: */ BookType.WithADedication,
  /* desc: */ "",
  /* gender: */ BookGender.ClassicLiterature,
  /* author: */ "Tara Westover",
  /* pages: */ 500,
  /* ISBN: */ "9780525559474",
  /* language: */ Languages.English,
  /* editorial: */ "Penguin",
  /* publishDate: */ new Date(2020, 8, 13),
  /* condition: */ BookCondition.ReallyBad,
  /* reviews: */ [reviewOne,reviewTwo,reviewThree],
  /* imageSrc: */ 'https://http2.mlstatic.com/D_NQ_NP_749866-CBT75839432672_042024-O.webp',
  /* owner: */ new UserProfile("Paula")
)

const bookThree : Book = new Book(
  /* id: */ 3,
  /* title: */ 'Duna',
  /* bookType: */ BookType.Collectible,
  /* desc: */ "",
  /* gender: */ BookGender.Drama,
  /* author: */ "Frank Herbert",
  /* pages: */ 140,
  /* ISBN: */ "9780525559474",
  /* language: */ Languages.Portuguese,
  /* editorial: */ "Penguin",
  /* publishDate: */ new Date(2020, 8, 13),
  /* condition: */ BookCondition.VeryGood,
  /* reviews: */ [reviewOne,reviewTwo,reviewThree],
  /* imageSrc: */ 'https://cdn.livriz.com/media/mediaspace/F9AFB48D-741D-4834-B760-F59344EEFF34/45/77621296-69ba-4513-acfc-5c6513bc7c67/mediamodifierc58cc803e01.webp',
  /* owner: */ new UserProfile("Francisco")
)

const bookFour : Book = new Book(
  /* id: */ 4,
  /* title: */ 'Gente Normal',
  /* bookType: */ BookType.Common,
  /* desc: */ "",
  /* gender: */ BookGender.Romance,
  /* author: */ "Sally Rooney",
  /* pages: */ 1500,
  /* ISBN: */ "9780525559474",
  /* language: */ Languages.Spanish,
  /* editorial: */ "Penguin",
  /* publishDate: */ new Date(2020, 8, 13),
  /* condition: */ BookCondition.Excellent,
  /* reviews: */ [reviewOne,reviewTwo,reviewThree],
  /* imageSrc: */ 'https://sbslibreria.vtexassets.com/arquivos/ids/5074134-800-450?v=638854331913070000&width=800&height=450&aspect=true',
  /* owner: */ new UserProfile("Augusto")
)

export const booksMOCK : Book[] = [bookOne, bookTwo, bookThree, bookFour]