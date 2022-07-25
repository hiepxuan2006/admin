import Pagination from 'components/Pagination';
import React, { useState } from 'react';
import { useEffect } from 'react';
import {
   Badge,
   Button,
   Card,
   Navbar,
   Nav,
   Table,
   Container,
   Row,
   Col,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import productService from 'services/productService';
import confirmDelete from 'utils/confirmDelete';
import { BaseUrl } from 'utils/Contants';
function Product(props) {
   const [data, setData] = useState([]);
   const [pagination, setPagination] = useState({
      page: 1,
      limit: 1,
      totalRows: 1,
   });

   const { page, limit, totalRows } = pagination;
   const handlePageChange = (newpage) => {
      setPagination({ ...pagination, page: newpage });
   };
   const handleDelete = async (id) => {
      try {
         const isDel = await confirmDelete({
            url: 'product',
            params: { id: id },
         });
         if (isDel) {
            const del = data.filter((i) => {
               return i.id !== id;
            });

            setData(del);
         }
      } catch (error) {}
   };
   useEffect(() => {
      const fethApi = async () => {
         const params = { page: page, limit: 8 };
         const results = await productService.getAll(params);

         setData(results.data);
         setPagination({
            ...pagination,
            limit: results.limit,
            totalRows: results.totalRows,
         });
      };
      fethApi();
   }, []);
   return (
      <>
         <Container fluid>
            <Row>
               <Col md="12">
                  <Card className="strpied-tabled-with-hover">
                     <div>
                        <Button variant="success" className="ml-3 mt-2">
                           <Link to="/admin/san-pham/them-san-pham">
                              Thêm sản phẩm mới
                           </Link>
                        </Button>
                        <Card.Header>
                           <Card.Title as="h4">Danh sách sản phẩm</Card.Title>
                        </Card.Header>
                     </div>
                     <Card.Body className="table-full-width table-responsive px-0">
                        <Table className="table-hover table-striped">
                           <thead>
                              <tr>
                                 <th className="border-0">STT</th>
                                 <th className="border-0">ID</th>
                                 <th className="border-0">Tên sản phẩm</th>
                                 <th className="border-0">Giá sản phẩm</th>
                                 <th className="border-0">Ảnh đại diện</th>
                                 <th className="border-0">Danh mục</th>
                                 <th className="border-0">Action</th>
                              </tr>
                           </thead>
                           <tbody>
                              {data &&
                                 data.map((item, key) => {
                                    return (
                                       <tr key={key}>
                                          <td>
                                             {1 + key + (page - 1) * limit}
                                          </td>
                                          <td>{item.id}</td>
                                          <td>{item.name}</td>
                                          <td>{item.price}</td>
                                          <td>
                                             <img
                                                style={{
                                                   width: '60px',
                                                   height: '60px',
                                                }}
                                                src={`${BaseUrl}/${item.feature_image_path}`}
                                                alt=""
                                             />
                                          </td>
                                          <td>
                                             {item.Category &&
                                                item.Category.name}
                                          </td>
                                          <td>
                                             <Button
                                                onClick={() =>
                                                   handleDelete(item.id)
                                                }
                                                variant="danger"
                                             >
                                                <i
                                                   to={'/'}
                                                   className="fas fa-trash"
                                                ></i>
                                             </Button>
                                             <Button variant="warning">
                                                <Link
                                                   to={`/admin/san-pham/chinh-sua-san-pham/${item.id}`}
                                                   className="fas fa-edit"
                                                ></Link>
                                             </Button>
                                          </td>
                                       </tr>
                                    );
                                 })}
                           </tbody>
                        </Table>
                     </Card.Body>
                  </Card>
               </Col>
            </Row>
            <Row>
               <div className="ml-3">
                  <Pagination
                     pagination={pagination}
                     onPageChange={handlePageChange}
                  />
               </div>
            </Row>
         </Container>
      </>
   );
}

export default Product;
