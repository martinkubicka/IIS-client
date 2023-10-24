import axios from "axios";
import API_BASE_URL from "@src/apiConfig";
import { PostModel } from "@src/shared/models/PostModel";

const instance = axios.create({
  baseURL: API_BASE_URL,
});

export const postService = {
  async getPost(postId: string) {
    try {
      const response = await instance.get(`/Post/getPost/${postId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async addPost(post: PostModel) {
    try {
      const response = await instance.post(`/Post/add`, post);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async deletePost(id: string) {
    try {
      const response = await instance.delete(`/Post/delete/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async updatePost(id: string, text: string) {
    try {
      const response = await instance.put(
        `/Post/updateText?postId=${id}&text=${text}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async getPostsByThread(threadId: string, limit: number, offset: number) {
    try {
      const response = await instance.get(
        `/Post/getPostsByThread/${threadId}?limit=${limit}&offset=${offset}`
      );
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

  async getRatingByPostAndUser(postId: string, userEmail: string) {
    try {
      const response = await instance.get(
        `/Rating/getRatingByPostAndUser/${postId}/${userEmail}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateRating(postId: string, userEmail: string, ratingChange: number) {
    try {
      const response = await instance.post(
        `http://localhost:5203/Rating/update?postId=${postId}&userEmail=${userEmail}&ratingChange=${ratingChange}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
