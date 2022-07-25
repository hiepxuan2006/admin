import React from 'react';
import httpRequest from 'utils/httpRequest';

const categoryServices = {
   getAllCategory: (params) => {
      const url = 'category/';
      return httpRequest.get(url, { params });
   },
   podtCategory: (data) => {
      const url = 'category/add';
      return httpRequest.post(url, data);
   },
   getOneCategory: (params) => {
      const url = 'category/get-one';
      return httpRequest.get(url, { params });
   },
   updateCategory: (id, data) => {
      const url = `category/update/${id}`;
      return httpRequest.patch(url, data);
   },
};
export default categoryServices;
