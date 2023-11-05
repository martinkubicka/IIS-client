import axios, { AxiosError } from "axios";
import API_BASE_URL from "@src/apiConfig";
import { userService } from "./userService";
import { UserProfileModel } from "@src/shared/models/UserProfileModel";
import { authHeaderGenerator } from "./authHeaderGenerator";

const instance = axios.create({
  baseURL: API_BASE_URL,
});

const headers = authHeaderGenerator.getAuthHeader();

export const memberService = {
  async getGroupMembersCount(handle?: string) {
    var params = `/Member/GetMembersCount?Handle=${handle}`;

    try {
      const response = await instance.get(params, { headers });
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
      const response = await instance.get(params, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteMember(email?: string, handle?: string) {
    var params = `/Member/delete?email=${email}&handle=${handle}`;

    try {
      const response = await instance.delete(params, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateMemberRole(email?: string, role?: number, handle?: string) {
    var params = `/Member/updateRole?email=${email}&role=${role}&handle=${handle}`;

    try {
      const response = await instance.put(params, null, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async userInGroup(email?: string, handle?: string) {
    if (email == undefined || handle == undefined) {
      return false;
    }

    var params = `/Member/UserInGroup?email=${email}&handle=${handle}`;

    try {
      const response = await instance.get(params, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getMemberRole(email?: string, handle?: string | null) {
    if (email == undefined || handle == undefined) {
      return;
    }
    
    var params = `/Member/getMemberRole?email=${email}&handle=${handle}`;

    try {
      const response = await instance.get(params, { headers });
      return response.data;
    } catch (error) {
      return null;
    }
  },

  async addMember(handle?: string, userEmail?: string, role = 1, name?: string, icon = "doughnut", userHandle?: string) {
    var userData : UserProfileModel;
    if (userHandle) {
      userData = await userService.getUser(userHandle);
    }
    
    const memberData = {
      handle: handle,
      role: role,
      email: userEmail,
      icon: userHandle ? userData.icon : icon,
      name: userHandle ? userData.name : icon,
    };
    try {
      const response = await instance.post("/Member/add", memberData, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
