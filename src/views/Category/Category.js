import Pagination from 'components/Pagination';
import React, { useEffect, useState } from 'react';
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
import categoryServices from 'services/categoryServices';
import { BaseUrl } from 'utils/Contants';
import confirmDelete from 'utils/confirmDelete';
function Category(props) {
   const [pagination, setPagination] = useState({
      page: 1,
      limit: 1,
      totalRows: 1,
   });
   const { page, limit, totalRows } = pagination;
   const [data, setData] = useState([]);

   const handlePageChange = (newPage) => {
      setPagination({ ...pagination, page: newPage });
      setFilter({ ...filter, page: newPage });
   };

   const handleDelete = async (id) => {
      const isdel = await confirmDelete({
         url: 'category',
         params: { id: id },
      });

      if (isdel) {
         const del = data.filter((i) => {
            return i.id !== id;
         });

         setData(del);
      }
   };

   useEffect(() => {
      const fethApi = async () => {
         const params = { page: page, limit: 8 };

         const results = await categoryServices.getAllCategory(params);
         setData(results.data);
         setPagination({
            ...pagination,
            limit: results.limit,
            totalRows: results.totalRows,
         });
      };
      fethApi();
   }, [page]);

   return (
      <>
         <Container fluid>
            <Row>
               <Col md="12">
                  <Card className="strpied-tabled-with-hover">
                     <div>
                        <Button variant="secondary" className=" ml-3 mt-2">
                           <Link to="/admin/danh-muc/them-danh-muc">
                              Thêm danh mục
                           </Link>
                        </Button>
                        <Card.Header>
                           <Card.Title as="h4">Danh mục sản phẩm</Card.Title>
                        </Card.Header>
                     </div>
                     <Card.Body className="table-full-width table-responsive px-0">
                        <Table className="table-hover table-striped">
                           <thead>
                              <tr>
                                 <th className="border-0">STT</th>
                                 <th className="border-0">ID</th>
                                 <th className="border-0">Tên danh mục</th>
                                 <th className="border-0">Ảnh</th>
                                 <th className="border-0">Action</th>
                              </tr>
                           </thead>
                           <tbody>
                              {data &&
                                 data.map((item, key) => {
                                    return (
                                       <tr key={key}>
                                          <td>
                                             {1 + key + limit * (page - 1)}
                                          </td>
                                          <td>{item.id}</td>
                                          <td>{item.name}</td>
                                          <td>
                                             <img
                                                style={{
                                                   height: '60px',
                                                   width: '60px',
                                                }}
                                                src={`${BaseUrl}${item.image_path}`}
                                                alt=""
                                             />
                                          </td>
                                          <td>
                                             <Button
                                                onClick={() => {
                                                   handleDelete(item.id);
                                                }}
                                                variant="danger"
                                             >
                                                <i class="fas fa-trash"></i>
                                             </Button>
                                             <Button variant="warning">
                                                <Link
                                                   to={`/admin/danh-muc/chinh-sua-danh-muc/${item.id}`}
                                                   class="fas fa-edit"
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

export default Category;
