import axios from "axios";
import API_BASE_URL from "@src/apiConfig";
import { PostModel } from "@src/shared/models/PostModel";

const instance = axios.create({
  baseURL: API_BASE_URL,
});

export const postService = {
  async getPostsByThread(threadId: string) {
    try {
      const response = await instance.get(`/Post/getPostsByThread/${threadId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async calculateRating(postId: string) {
    try {
      const response = await instance.get(`/Post/calculateRating/${postId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
