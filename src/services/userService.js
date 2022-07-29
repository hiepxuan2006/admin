const { default: httpRequest } = require('utils/httpRequest');

const userService = {
   getListUser: () => {
      const url = 'user/get-list';
      return httpRequest.get(url);
   },
};
module.exports = userService;
