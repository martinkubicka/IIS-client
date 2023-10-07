import axios from "axios";
import API_BASE_URL from "@src/apiConfig";
import { UserDetailModel } from "@src/shared/models/UserDetailModel";
import { UserPrivacySettingsModel } from "@src/shared/models/UserPrivacySettingsModel";

const instance = axios.create({
  baseURL: API_BASE_URL,
});

export const userService = {
  async updateUser(
    updatedUser?: UserDetailModel,
    userPrivacy?: UserPrivacySettingsModel
  ) {
    try {
      // Define the request data
      const requestData = {
        updatedUser: updatedUser,
        userPrivacy: userPrivacy,
      };

      // Send a PUT request to the specified endpoint
      const response = await instance.put("/User/update", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Return the response data
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getUser(handle?: string) {
    try {
      const response = await instance.get(`/User/profile?handle=${handle}`);
      return response.data;
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
