/**
 * @file authHeaderGenerator.tsx
 * @author { Martin Kubicka (xkubic45) }
 * @date 17.12.2023
 * @brief Definition of auth header generator for api autohorization
 */

export const authHeaderGenerator = {
    getTokenValue() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)jwtToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      );
  
      return token;
    },

    getAuthHeader() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)jwtToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      );
  
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      return headers;
    },
};