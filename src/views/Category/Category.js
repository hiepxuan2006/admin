import Pagination from 'components/Pagination';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import categoryServices from 'services/categoryServices';
import confirmDelete from 'utils/confirmDelete';
import { BaseUrl } from 'utils/Contants';
function Category(props) {
   const [load, setLoad] = useState(false);
   const [loading, setLoading] = useState(false);
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
         try {
            const params = { page: page, limit: 8 };
            setLoading(true);
            const results = await categoryServices.getAllCategory(params);
            setLoading(false);
            setData(results.data);
            setPagination({
               ...pagination,
               limit: results.limit,
               totalRows: results.totalRows,
            });
         } catch (error) {
            setLoading(false);
         }
      };
      fethApi();
   }, [page, load]);

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
                        <Card.Header className="d-flex">
                           <Card.Title as="h4">Danh mục sản phẩm</Card.Title>
                           <Button className="btn-simple btn-icon ml-3 btn-light loading">
                              {loading ? (
                                 <i
                                    className="fas fa-redo-alt loading-icon"
                                    style={{ cursor: 'pointer' }}
                                 ></i>
                              ) : (
                                 <i
                                    onClick={() => {
                                       setData([]);
                                       setLoad(!load);
                                    }}
                                    className="fas fa-redo-alt "
                                    style={{
                                       cursor: 'pointer',
                                       fontSize: '20px',
                                       color: '#000',
                                    }}
                                 ></i>
                              )}
                           </Button>
                        </Card.Header>
                     </div>
                     <Card.Body className="table-full-width table-responsive px-0">
                        <Table className="table-hover ">
                           <thead>
                              <tr>
                                 <th className="border-0">STT</th>
                                 <th className="border-0">Ảnh</th>
                                 <th className="border-0">ID</th>
                                 <th className="border-0">Tên danh mục</th>
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
                                          <td>{item.id}</td>
                                          <td>{item.name}</td>
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
