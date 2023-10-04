import axios, { AxiosError } from 'axios';
import API_BASE_URL from '@src/apiConfig';
import { UserDetailModel } from '@src/shared/models/UserDetailModel';
import { NewPasswordModel } from '@src/shared/models/NewPasswordModel';
import { LoginModel } from '@src/shared/models/LoginModel';
import { authHeaderGenerator } from './authHeaderGenerator';
import Cookies from 'js-cookie';
import jwt from 'jwt-decode'

const instance = axios.create({
  baseURL: API_BASE_URL,
});

export const loginService = {
    async login(data?: LoginModel) {
        try {
          const response = await instance.post(`/Login/login`, data)
          
          const expirationMinutes = 30;
          const expirationDate = new Date();
          expirationDate.setTime(expirationDate.getTime() + expirationMinutes * 60 * 1000);
          
          Cookies.set('jwtToken', response.data, { expires: expirationDate });

          const claims = jwt(response.data);
          const role = claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          window.userRole = role;

          return response.data;
        } catch (error) {
          console.log("err");
          throw error;
        }
      },

      async logout() {
        try {
            const headers = authHeaderGenerator.getAuthHeader();
        
            const response = await instance.post('/Login/logout', null, { headers });
            return response.data;
          } catch (error) {
            throw error;
          }
        
      },

      async register(data: UserDetailModel) {
        try {
          const response = await instance.post(`/User/add`, data);
          return response.data;
        } catch (error) {
          throw error;
        }
      },

      async forgot(email?: string) {
        try {
          const response = await instance.post(`/Login/forgot?email=` + email);
          return response.data;
        } catch (error) {
          throw error;
        }
      },

      async newPassword(data?: NewPasswordModel) {
        try {
          const response = await instance.put(`/Login/newPassword`, data);
          return response.data;
        } catch (error) {
          throw error;
        }
      },
};
