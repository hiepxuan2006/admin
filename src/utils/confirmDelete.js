import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import deleteServecies from './deleteServices';

const confirmDelete = async (data) => {
   let kq;
   await Swal.fire({
      title: 'Bạn muốn xóa?',
      text: 'Đồng ý nếu bạn muốn xóa!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý, xóa!',
   }).then(async (result) => {
      if (result.isConfirmed) {
         try {
            const results = await deleteServecies.del(data.url, data.params);
            if (results.success) {
               kq = true;
               Swal.fire('Đã xóa!', 'Bạn đã xóa thành công.', 'success');
            }
         } catch (error) {
            kq = false;
            Swal.fire('Thất bại!', 'Chưa thực hiện thành công', 'warning');
         }
      } else {
         kq = false;
      }
   });
   return kq;
};
export default confirmDelete;
