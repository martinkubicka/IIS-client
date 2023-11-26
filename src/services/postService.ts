import API_BASE_URL from "@src/apiConfig";
import { PostModel } from "@src/shared/models/PostModel";
import axios from "axios";
import { authHeaderGenerator } from "./authHeaderGenerator";

const instance = axios.create({
  baseURL: API_BASE_URL,
});

const headers = authHeaderGenerator.getAuthHeader();

export const postService = {
  async getPost(postId: string) {
    try {
      const response = await instance.get(`/Post/getPost/${postId}`, {
        headers,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async addPost(post: PostModel) {
    try {
      const response = await instance.post(`/Post/add`, post, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deletePost(id: string) {
    try {
      const response = await instance.delete(`/Post/delete/${id}`, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updatePost(id: string, text: string) {
    try {
      const response = await instance.put(
        `/Post/updateText?postId=${id}&text=${text}`,
        null,
        { headers }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getPostsByThread(threadId: string, limit: number, offset: number) {
    try {
      const response = await instance.get(
        `/Post/getPostsByThread/${threadId}?limit=${limit}&offset=${offset}`,
        { headers }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getPostsGroupedByThread(
    userHandle: string,
    threadsLimit: number,
    postsPerThreadLimit: number
  ) {
    try {
      const response = await instance.get(
        `/Post/getPostsGroupedByThread/${userHandle}?threadLimit=${threadsLimit}&postsPerThreadLimit=${postsPerThreadLimit}`,
        { headers }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getGroupHandleByPostId(postId: string) {
    try {
      const response = await instance.get(
        `/Post/getGroupHandleByPostId/${postId}`,
        { headers }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async calculateRating(postId: string) {
    try {
      const response = await instance.get(`/Post/calculateRating/${postId}`, {
        headers,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getRatingByPostAndUser(postId: string, userEmail: string) {
    try {
      const response = await instance.get(
        `/Rating/getRatingByPostAndUser/${postId}/${userEmail}`,
        { headers }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateRating(postId: string, userEmail: string, ratingChange: number) {
    try {
      const response = await instance.post(
        `http://localhost:5203/Rating/update?postId=${postId}&userEmail=${userEmail}&ratingChange=${ratingChange}`,
        null,
        { headers }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
