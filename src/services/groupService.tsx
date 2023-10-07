import axios from "axios";
import API_BASE_URL from "@src/apiConfig";
import { GroupModel } from "@src/shared/models/GroupModel";

const instance = axios.create({
  baseURL: API_BASE_URL,
});

export const groupService = {
  async getGroupsUserIsIn(userEmail?: string, joined?: boolean) {
    try {
      const response = await instance.get(`/Group/user/${userEmail}/${joined}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async joinGroup(handle?: string, userEmail?: string) {
    const memberData = {
      handle: handle,
      email: userEmail,
      role: 1,
    };
    try {
      const response = await instance.post("/Member/add", memberData);
      console.log(response.data);
    } catch (error) {
      throw error;
    }
  },

  async leaveGroup(handle?: string, userEmail?: string) {
    try {
      const response = await instance.delete(
        `/Member/delete?email=${userEmail}&handle=${handle}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async createGroup(data?: GroupModel) {
    try {
      const response = await instance.post("/Group/create", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getGroup(handle?: string) {
    try {
      const response = await instance.get(`/Group/${handle}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getGroupPolicy(handle?: string) {
    try {
      const response = await instance.get(`/Group/policy/${handle}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateGroup(data?: GroupModel) {
    try {
      const response = await instance.put(`/Group/update`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteGroup(handle?: string) {
    try {
      const response = await instance.delete(`/Group/remove/${handle}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateGroupPolicy(data?: GroupModel) {
    try {
      const response = await instance.put(
        `/Group/updatePolicy?handle=${data?.handle}`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
