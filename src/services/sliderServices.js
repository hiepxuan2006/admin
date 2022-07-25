import httpRequest from 'utils/httpRequest';

const sliderServices = {
   getAllSlider: () => {
      const url = 'slider';
      return httpRequest.get(url);
   },
   addSLider: (data) => {
      const url = 'slider/add';
      return httpRequest.post(url, data);
   },
};
export default sliderServices;
