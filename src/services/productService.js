import httpRequest from 'utils/httpRequest';

const productService = {
   getAll: (params) => {
      const url = 'product';
      return httpRequest.get(url, { params });
   },
   addProduct: (data) => {
      const url = 'product/add';
      return httpRequest.post(url, data);
   },
   updateProduct: (data, id) => {
      const url = `product/update/${id}`;
      return httpRequest.patch(url, data);
   },
   getProduct: (params) => {
      const url = 'product/get-one';
      return httpRequest.get(url, { params });
   },
};
export default productService;
