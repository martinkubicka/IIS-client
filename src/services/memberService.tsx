import axios, { AxiosError } from "axios";
import API_BASE_URL from "@src/apiConfig";

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

  async getGroupMembers(
    handle?: string,
    currentPage?: number,
    itemsPerPage?: number
  ) {
    var params = `/Member/getMembers?handle=${handle}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`;

    try {
      const response = await instance.get(params);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteMember(email?: string, handle?: string) {
    var params = `/Member/delete?email=${email}&handle=${handle}`;

    try {
      const response = await instance.delete(params);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateMemberRole(email?: string, role?: number, handle?: string) {
    var params = `/Member/updateRole?email=${email}&role=${role}&handle=${handle}`;

    try {
      const response = await instance.put(params);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async addMember(handle?: string, userEmail?: string, role = 1, name?: string, icon = "doughnut") {
    const memberData = {
      handle: handle,
      role: role,
      email: userEmail,
      icon: icon,
      name: name,
    };
    console.log(memberData);
    try {
      const response = await instance.post("/Member/add", memberData);
      console.log(response.data);
    } catch (error) {
      throw error;
    }
  },
};
