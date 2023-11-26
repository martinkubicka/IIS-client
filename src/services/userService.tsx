import API_BASE_URL from "@src/apiConfig";
import { UserDetailModel } from "@src/shared/models/UserDetailModel";
import { UserPrivacySettingsModel } from "@src/shared/models/UserPrivacySettingsModel";
import { UserProfileModel } from "@src/shared/models/UserProfileModel";
import axios from "axios";

const instance = axios.create({
  baseURL: API_BASE_URL,
});

export const userService = {
  async updateUser(
    updatedUser?: UserDetailModel,
    userPrivacy?: UserPrivacySettingsModel
  ) {
    try {
      const response = await instance.put("/User/update", {
        updatedUser,
        userPrivacy,
      });

      if (response.status === 204) {
        return "User successfully updated";
      } else {
        throw new Error("Failed to update user");
      }
    } catch (error) {
      throw error;
    }
  },
  async updateUserWithoutPassword(
    updatedUser?: UserDetailModel,
    userPrivacy?: UserPrivacySettingsModel
  ) {
    try {
      const response = await instance.put("/User/updateWithoutPassword", {
        updatedUser,
        userPrivacy,
      });

      if (response.status === 204) {
        return "User successfully updated";
      } else {
        throw new Error("Failed to update user");
      }
    } catch (error) {
      throw error;
    }
  },

  async getUser(handle?: string) {
    try {
      const response = await instance.get(`/User/profile?handle=${handle}`);
      return response.data as UserProfileModel;
    } catch (error) {
      throw error;
    }
  },

  async getUserIcon(handle?: string) {
    try {
      const response = await this.getUser(handle);
      return response.icon;
    } catch (error) {
      throw error;
    }
  },

  async getPrivacy(handle?: string) {
    try {
      const response = await instance.get(`/User/privacy?handle=${handle}`);
      return response.data as UserPrivacySettingsModel;
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
