import axios from "axios";
import API_BASE_URL from "@src/apiConfig";
import { GroupModel } from "@src/shared/models/GroupModel";
import { authHeaderGenerator } from "./authHeaderGenerator";

const instance = axios.create({
  baseURL: API_BASE_URL,
});

const headers = authHeaderGenerator.getAuthHeader();

export const groupService = {
  async getGroupsUserIsIn(userEmail?: string, joined?: boolean) {
    try {
      const response = await instance.get(`/Group/user/${userEmail}/${joined}`, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async addGroup(data?: GroupModel) {
    try {
      const response = await instance.post("/Group/add", data, { headers });
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
      const response = await instance.put(`/Group/update`, data, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteGroup(handle?: string) {
    try {
      const response = await instance.delete(`/Group/remove/${handle}`, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateGroupPolicy(data?: GroupModel) {
    try {
      const response = await instance.put(
        `/Group/updatePolicy?handle=${data?.handle}`,
        data,
        { headers }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getAllGroups() {
    try {
      const response = await instance.get("/Group");
      return response.data as GroupModel[];
    } catch (error) {
      throw error;
    }
  },
};
