import axios from 'axios';
import API_BASE_URL from '@src/apiConfig';
import { ThreadModel } from '@src/shared/models/ThreadModel';

const instance = axios.create({
  baseURL: API_BASE_URL,
});

export const threadService = {
  async getGroupThreads(handle?: string, currentPage?: number, itemsPerPage?: number, filterName?: string | null, filterFromDate?: string | null, filterToDate? : string | null) {
    var params = `/Thread/GetThreads?handle=${handle}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`;
    if (filterName && filterName !== '') {
      params += `&filterName=${filterName}`;
    }
    if (filterFromDate) {
      params += `&filterFromDate=${filterFromDate}`;
    }
    if (filterToDate) {
      params += `&filterToDate=${filterToDate}`;
    }

    try {
      const response = await instance.get(params);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getGroupThreadsCount(handle?: string, filterName?: string | null, filterFromDate?: string | null, filterToDate? : string | null) {
    var params = `/Thread/GetThreadsCount?handle=${handle}`;
    if (filterName) {
      params += `&filterName=${filterName}`;
    }
    if (filterFromDate) {
      params += `&filterFromDate=${filterFromDate}`;
    }
    if (filterToDate) {
      params += `&filterToDate=${filterToDate}`;
    }

    try {
      const response = await instance.get(params);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async createThread(data?: ThreadModel) {
    try {
      console.log(data);
      const response = await instance.post(`/Thread/create`, data);
      return response.data;
    } catch (error) {
      console.log(error)
      throw error;
    }
  },

  async deleteThread(id?: string) {
    try {
      const response = await instance.delete(`/Thread/delete/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateThread(id?: string, data?: ThreadModel) {
    try {
      const response = await instance.put(`/Thread/update/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
