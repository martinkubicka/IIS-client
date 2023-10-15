import axios from "axios";
import API_BASE_URL from "@src/apiConfig";
import { UserDetailModel } from "@src/shared/models/UserDetailModel";
import { UserPrivacySettingsModel } from "@src/shared/models/UserPrivacySettingsModel";
import { UserProfileModel } from "@src/shared/models/UserProfileModel";

const instance = axios.create({
  baseURL: API_BASE_URL,
});

export const userService = {
  async updateUser(
    updatedUser?: UserDetailModel,
    userPrivacy?: UserPrivacySettingsModel
  ) {},

  async getUser(handle?: string) {
    try {
      const response = await instance.get(`/User/profile?handle=${handle}`);
      return response.data as UserProfileModel;
    } catch (error) {
      throw error;
    }
  },
  async getPrivacy(handle?: string) {
    try {
      const response = await instance.get(`/User/privacy?handle=${handle}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteUser(email?: string) {
    try {
      const response = await instance.delete(`/User/delete?email=${email}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
