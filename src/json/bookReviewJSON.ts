import { UserReviewer } from "@/model/userReviewer"
export type BookReviewJSON = {
  rate: number
  review: string
  color: string
  reviewer: UserReviewer
}
