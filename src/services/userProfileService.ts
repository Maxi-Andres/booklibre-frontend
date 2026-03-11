import { REST_SERVER_URL } from "@/config/configuration"
import type { UserProfileJSON } from "@/json/userProfileJSON"
import { UserProfile } from "@/model/userProfile"
import axios from "axios"

class UserProfileService {
  async getProfile(id: number): Promise<UserProfile> {
    const response = await axios.get<UserProfileJSON>(
      REST_SERVER_URL + `/profile/${id}`,
    )
    return UserProfile.fromJSON(response.data)
  }
}
