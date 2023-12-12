/**
 * @file serachService.tsx
 * @author { Dominik Petrik (xpetri25) }
 * @date 17.12.2023
 * @brief Definition of search service which calls search endpoints
 */

import API_BASE_URL from "@src/apiConfig";
import axios from "axios";

const instance = axios.create({
  baseURL: API_BASE_URL,
});

export const searchService = {
  async searchGroups(searchTerm: string, limit: number = 0) {
    try {
      let response;
      if (searchTerm == "") {
        response = await instance.get(`/Group?limit=${limit}`);
      } else {
        response = await instance.get(
          `/Group/search?searchTerm=${searchTerm}&limit=${limit}`
        );
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async searchThreads(searchTerm: string, limit: number = 0) {
    try {
      let response;
      if (searchTerm == "") {
        response = await instance.get(`/Thread/GetAllThreads?limit=${limit}`);
      } else {
        response = await instance.get(
          `/Thread/search?searchTerm=${searchTerm}&limit=${limit}`
        );
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async searchUsers(searchTerm: string, limit: number = 0) {
    try {
      let response;
      searchTerm = searchTerm.trim();
      if (searchTerm == "") {
        response = await instance.get(`/User/getUsers?limit=${limit}`);
      } else {
        response = await instance.get(
          `/User/search?searchTerm=${searchTerm}&limit=${limit}`
        );
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
