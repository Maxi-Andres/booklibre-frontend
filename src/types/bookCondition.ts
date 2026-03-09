export const BookCondition = {
  Excellent: "EXCELENTE",
  VeryGood: "MUY BUENO",
  Good: "BUENO",
  Bad: "MALO",
  ReallyBad: "REGULAR",
}

export type BookCondition = (typeof BookCondition)[keyof typeof BookCondition]
