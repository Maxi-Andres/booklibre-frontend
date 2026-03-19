import { REST_SERVER_URL, sessionId } from "@/config/configuration"
import type { UserProfileJSON, UserProfileUpdateJSON } from "@/json/userProfileJSON"
import { UserProfile } from "@/model/userProfile"
import axios from "axios"

class UserProfileService {
  async getProfile() {
    const response = await axios.get<UserProfileJSON>(
      REST_SERVER_URL + `/profile/${sessionId}`,
    )
    return UserProfile.fromJSON(response.data)
  }

  async updateProfile(profileData: UserProfile, imageFile?: File | null) {
    const formData = new FormData()

    const userData: UserProfileUpdateJSON = {
      id: profileData.id,
      name: profileData.name,
      description: profileData.description,
      email: profileData.email,
      cel: profileData.cel,
      location: profileData.location,
      timestamp: profileData.timestamp,
      bibliokarmas: profileData.bibliokarmas,
      userType: profileData.userType,
    }

    formData.append(
      "userData",
      new Blob([JSON.stringify(userData)], { type: "application/json" })
    )

    if (imageFile) {
      formData.append("image", imageFile)
    }

    const response = await axios.put<UserProfileJSON>( REST_SERVER_URL + `/updateProfile`, formData )
    return UserProfile.fromJSON(response.data)
  }
}

export const userProfileService = new UserProfileService()
