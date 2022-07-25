import Category from 'views/Category';
import Dashboard from 'views/Dashboard.js';
import Icons from 'views/Icons.js';
import Order from 'views/Order';
import Product from 'views/Product';
import Slider from 'views/Slider';
import TableList from 'views/TableList.js';

import UserProfile from 'views/UserProfile.js';

const _nav = [
   {
      path: '/dashboard',
      name: 'Dashboard',
      icon: 'nc-icon nc-chart-pie-35',
      layout: '/admin',
   },
   {
      path: '/user',
      name: 'Ds Khách hàng',
      icon: 'nc-icon nc-circle-09',
      layout: '/admin',
   },
   {
      path: '/danh-muc',
      name: 'Danh mục sản phẩm',
      icon: 'nc-icon nc-bullet-list-67',
      layout: '/admin',
   },
   {
      path: '/san-pham',
      name: 'Ds sản phẩm',
      icon: 'nc-icon nc-grid-45',
      layout: '/admin',
   },
   {
      path: '/don-hang',
      name: 'Đơn hàng',
      icon: 'nc-icon nc-paper-2',
      layout: '/admin',
   },
   {
      path: '/slider',
      name: 'Slider',
      icon: 'nc-icon nc-album-2',
      layout: '/admin',
   },

   {
      path: '/table',
      name: 'Table List',
      icon: 'nc-icon nc-notes',
      layout: '/admin',
   },

   {
      path: '/icons',
      name: 'Icons',
      icon: 'nc-icon nc-atom',
      layout: '/admin',
   },
];

export default _nav;
