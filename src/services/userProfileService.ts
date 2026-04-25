import { REST_SERVER_URL } from "@/config/configuration"
import type {
  UserProfileJSON,
  UserProfileUpdateJSON,
} from "@/json/userProfileJSON"
import { UserProfile } from "@/domain/userProfile"
import axios from "axios"
import { getId } from "@/context/AuthContext"
import { tokenService } from "./tokenService"

class UserProfileService {
  get id() {
    return getId()
  }

  async getProfile() {
    const userId = this.id
    const response = await axios.get<UserProfileJSON>(
      REST_SERVER_URL + `/profile/${userId}`,
    )
    return UserProfile.fromJSON(response.data)
  }

  async updateProfile(profileData: UserProfile) {
    const formData = new FormData()

    const userData: UserProfileUpdateJSON = {
      id: profileData.id,
      name: profileData.name,
      description: profileData.description,
      img: profileData.img,
      email: profileData.email,
      cel: profileData.cel,
      location: profileData.location,
      timestamp: profileData.timestamp,
      bibliokarmas: profileData.bibliokarmas,
      userType: profileData.userType,
    }

    formData.append(
      "userData",
      new Blob([JSON.stringify(userData)], { type: "application/json" }),
    )

    const response = await axios.put<{ user: UserProfileJSON, accessToken: string }>(
      REST_SERVER_URL + `/updateProfile`, formData
    )
    tokenService.updateAccessToken(response.data.accessToken)
    return UserProfile.fromJSON(response.data.user)
  }
}

export const userProfileService = new UserProfileService()
