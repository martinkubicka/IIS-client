/**
 * @file threadService.tsx
 * @author { Martin Kubicka (xkubic45) }
 * @date 17.12.2023
 * @brief Definition of thread service which calls thread endpoints
 */

import API_BASE_URL from "@src/apiConfig";
import { ThreadModel } from "@src/shared/models/ThreadModel";
import axios from "axios";
import { authHeaderGenerator } from "./authHeaderGenerator";

const instance = axios.create({
  baseURL: API_BASE_URL,
});

export const threadService = {
  async getThread(threadId: string) {
    try {
      const response = await instance.get(`/Thread/get/${threadId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getGroupThreads(
    handle?: string,
    currentPage?: number,
    itemsPerPage?: number,
    filterName?: string | null,
    filterFromDate?: string | null,
    filterToDate?: string | null
  ) {
    var params = `/Thread/GetThreads?handle=${handle}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`;
    if (filterName && filterName !== "") {
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

  async getAllThreadsUserIsIn(handle?: string) {
    const headers = authHeaderGenerator.getAuthHeader();

    try {
      const response = await instance.get(
        `/Thread/GetAllThreadsUserIsIn/${handle}`,
        { headers }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getGroupThreadsCount(
    handle?: string,
    filterName?: string | null,
    filterFromDate?: string | null,
    filterToDate?: string | null
  ) {
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
    const headers = authHeaderGenerator.getAuthHeader();

    try {
      const response = await instance.post(`/Thread/create`, data, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteThread(id?: string) {
    const headers = authHeaderGenerator.getAuthHeader();

    try {
      const response = await instance.delete(`/Thread/delete/${id}`, {
        headers,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateThread(id?: string, data?: ThreadModel) {
    const headers = authHeaderGenerator.getAuthHeader();

    try {
      const response = await instance.put(`/Thread/update/${id}`, data, {
        headers,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
