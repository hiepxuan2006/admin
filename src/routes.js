import Category from 'views/Category';
import { EditCategory } from 'views/Category';
import { AddCategory } from 'views/Category';
import Dashboard from 'views/Dashboard.js';
import Icons from 'views/Icons.js';
import Order from 'views/Order';
import OrderDetail from 'views/Order/OrderDetail';
import Product from 'views/Product';
import { EditProduct } from 'views/Product';
import { AddProduct } from 'views/Product';
import Slider from 'views/Slider';
import { AddSlider } from 'views/Slider';
import TableList from 'views/TableList.js';

import UserProfile from 'views/UserProfile.js';

const dashboardRoutes = [
   {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      layout: '/admin',
   },
   {
      path: '/user',
      name: 'Ds Khách hàng',
      component: UserProfile,
      layout: '/admin',
   },
   // danh mục
   {
      path: '/danh-muc',
      name: 'Danh mục sản phẩm',
      component: Category,
      layout: '/admin',
      exact: true,
   },
   {
      path: '/danh-muc/them-danh-muc',
      name: 'Thêm danh mục',
      component: AddCategory,
      layout: '/admin',
   },
   {
      path: '/danh-muc/chinh-sua-danh-muc/:id',
      name: 'Chinh sửa danh mục',
      component: EditCategory,
      layout: '/admin',
   },
   // san pham
   {
      path: '/san-pham',
      name: 'Ds sản phẩm',
      component: Product,
      exact: true,
      layout: '/admin',
   },
   {
      path: '/san-pham/them-san-pham',
      name: 'Thêm sản phẩm',
      component: AddProduct,
      layout: '/admin',
   },
   {
      path: '/san-pham',
      name: 'Ds sản phẩm',
      component: Product,
      layout: '/admin',
      exact: true,
   },
   {
      path: '/san-pham/chinh-sua-san-pham/:id',
      name: 'Ds sản phẩm',
      component: EditProduct,
      layout: '/admin',
   },
   // down hang
   {
      path: '/don-hang',
      name: 'Đơn hàng',
      component: Order,
      layout: '/admin',
      exact: true,
   },
   {
      path: '/don-hang/chi-tiet/:id',
      name: 'Chi tiết đơn hàng',
      component: OrderDetail,
      layout: '/admin',
   },
   // /slider
   {
      path: '/slider',
      name: 'Slider',
      component: Slider,
      layout: '/admin',
      exact: true,
   },
   {
      path: '/slider/them-slider',
      name: 'Thêm slider',
      component: AddSlider,
      layout: '/admin',
   },

   {
      path: '/table',
      name: 'Table List',
      component: TableList,
      layout: '/admin',
   },

   {
      path: '/icons',
      name: 'Icons',
      component: Icons,
      layout: '/admin',
   },
];

export default dashboardRoutes;
