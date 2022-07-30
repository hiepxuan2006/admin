import Pagination from 'components/Pagination';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import categoryServices from 'services/categoryServices';
import productService from 'services/productService';
import confirmDelete from 'utils/confirmDelete';
import { BaseUrl } from 'utils/Contants';
function Product(props) {
   const [data, setData] = useState([]);
   const [load, setLoad] = useState(false);
   const [loading, setLoading] = useState(false);
   const [category, setCategory] = useState([]);
   const [categoryId, setCategoryId] = useState('');
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
   categoryId;
   useEffect(() => {
      const fethApi = async () => {
         try {
            const params = categoryId
               ? { page: page, limit: 8, categoryId: categoryId }
               : { page: page, limit: 8 };
            setLoading(true);
            const results = await productService.getAll(params);
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
   }, [load, categoryId]);

   useEffect(() => {
      const fetchApi = async () => {
         try {
            const results = await categoryServices.getAllCategory('');
            setCategory(results.data);
         } catch (error) {}
      };
      fetchApi();
   }, []);
   const handleChangCtate = (e) => {
      setCategoryId(e.target.value);
      setData([]);
   };
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
                        <Card.Header className="d-flex align-items-center justify-content-between">
                           <div className="d-flex align-items-center">
                              <Card.Title as="h4">
                                 Danh sách sản phẩm
                              </Card.Title>
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
                           </div>
                           <div className="ml-3">
                              <select
                                 class="custom-select"
                                 onChange={handleChangCtate}
                              >
                                 <option value="" selected>
                                    Danh mục sản phẩm
                                 </option>
                                 {category &&
                                    category.map((item, key) => {
                                       return (
                                          <option key={key} value={item.id}>
                                             {item.name}
                                          </option>
                                       );
                                    })}
                              </select>
                           </div>
                        </Card.Header>
                     </div>
                     <Card.Body className="table-full-width table-responsive px-0">
                        <Table className="table-hover ">
                           <thead>
                              <tr>
                                 <th className="border-0">STT</th>
                                 <th className="border-0">Ảnh đại diện</th>
                                 <th className="border-0">ID</th>
                                 <th className="border-0">Tên sản phẩm</th>
                                 <th className="border-0">Giá sản phẩm</th>
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
                                          <td>{item.id}</td>
                                          <td>{item.name}</td>
                                          <td>{item.price}</td>
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
