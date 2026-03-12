import { UserReviewer } from "@/model/userReviewer"
export type BookReviewJSON = {
  rate: number
  review: string
  reviewerId: number
  color: string
  reviewer: UserReviewer
}
