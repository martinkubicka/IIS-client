import axios from 'axios';
import API_BASE_URL from '@src/apiConfig';
import { GroupModel } from '@src/shared/models/GroupModel';

const instance = axios.create({
  baseURL: API_BASE_URL,
});

export const groupService = {
  async getGroup(handle?: string) {
    try {
      const response = await instance.get(`/Group/${handle}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateGroup(data: GroupModel) {
    try {
      const response = await instance.put(`/Group/update`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateGroupPolicy(data: GroupModel) {
    try {
      const response = await instance.put(`/Group/updatePolicy`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
