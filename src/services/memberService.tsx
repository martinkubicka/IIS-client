import axios, { AxiosError } from 'axios';
import API_BASE_URL from '@src/apiConfig';

const instance = axios.create({
  baseURL: API_BASE_URL,
});

export const memberService = {
    async getGroupMembersCount(handle?: string) {
        var params = `/Member/GetMembersCount?Handle=${handle}`;
    
        try {
          const response = await instance.get(params);
          return response.data;
        } catch (error) {
          throw error;
        }
    },

    async getGroupMembers(handle?: string, currentPage?: number, itemsPerPage?: number,) {
        var params = `/Member/getMembers?handle=${handle}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`;

        try {
          const response = await instance.get(params);
          return response.data;
        } catch (error) {
          throw error;
        }
    },
};

