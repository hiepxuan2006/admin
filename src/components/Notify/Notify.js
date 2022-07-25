import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Notify(props) {
   return (
      <div>
         <ToastContainer draggable={false} transition={Zoom} autoClose={1500} />
      </div>
   );
}

export default Notify;
