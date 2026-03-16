export const BookCondition = {
  EXCELLENT: "EXCELENTE",
  VERY_GOOD: "MUY BUENO",
  GOOD: "BUENO",
  BAD: "MALO",
  REGULAR: "REGULAR",
}

export type BookCondition = (typeof BookCondition)[keyof typeof BookCondition]
