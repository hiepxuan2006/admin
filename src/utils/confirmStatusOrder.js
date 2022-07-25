import { param } from 'jquery';
import orderService from 'services/orderService';
import Swal from 'sweetalert2';
import deleteServecies from './deleteServices';

const confirmStatusOrder = (id, status) => {
   Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: 'Đồng ý nếu bạn muốn!!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý!',
   }).then(async (result) => {
      if (result.isConfirmed) {
         const params = { id, status };
         const results = await orderService.updateStatus(params);
         if (results.success) {
            Swal.fire('Thay đổi thành công.', 'success');
         }
      }
   });
};
export default confirmStatusOrder;
