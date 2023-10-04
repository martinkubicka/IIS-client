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