/**
 * @file postService.tsx
 * @author { Dominik Petrik (xpetri25) }
 * @date 17.12.2023
 * @brief Definition of post service which calls post endpoints
 */

import API_BASE_URL from "@src/apiConfig";
import { PostModel } from "@src/shared/models/PostModel";
import axios from "axios";
import { authHeaderGenerator } from "./authHeaderGenerator";

const instance = axios.create({
  baseURL: API_BASE_URL,
});

export const postService = {
  async getPost(postId: string) {
    const headers = authHeaderGenerator.getAuthHeader();
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
    const headers = authHeaderGenerator.getAuthHeader();
    try {
      const response = await instance.post(`/Post/add`, post, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deletePost(id: string) {
    const headers = authHeaderGenerator.getAuthHeader();
    try {
      const response = await instance.delete(`/Post/delete/${id}`, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updatePost(id: string, text: string) {
    const headers = authHeaderGenerator.getAuthHeader();
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
    const headers = authHeaderGenerator.getAuthHeader();
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
    const headers = authHeaderGenerator.getAuthHeader();
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
    const headers = authHeaderGenerator.getAuthHeader();
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
    const headers = authHeaderGenerator.getAuthHeader();
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
    const headers = authHeaderGenerator.getAuthHeader();
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
    const headers = authHeaderGenerator.getAuthHeader();
    try {
      const response = await instance.post(
        `/Rating/update?postId=${postId}&userEmail=${userEmail}&ratingChange=${ratingChange}`,
        null,
        { headers }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
