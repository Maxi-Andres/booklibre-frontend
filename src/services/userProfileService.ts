import { REST_SERVER_URL } from "@/config/configuration"
import type { UserProfileJSON } from "@/json/userProfileJSON"
import { UserProfile } from "@/model/userProfile"
import axios from "axios"

class UserProfileService {
  async getProfile() {
    const response = await axios.get<UserProfileJSON>(
      REST_SERVER_URL + `/profile/${localStorage.getItem('id')}`,
    )
    return UserProfile.fromJSON(response.data)
  }
}

export const userProfileService = new UserProfileService()