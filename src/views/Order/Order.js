import { event } from 'jquery';
import { useEffect, useState } from 'react';
import {
   Button,
   Card,
   Col,
   Container,
   Form,
   Row,
   Table,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import orderService from 'services/orderService';
import confirmStatusOrder from 'utils/confirmStatusOrder';
import { OrderStatus } from 'utils/Contants';
import { setVND } from 'utils/curentVND';
function Order(props) {
   const [order, setOrder] = useState([]);

   useEffect(() => {
      const fetchApi = async () => {
         try {
            const results = await orderService.getAllOrder();
            setOrder(results.data);
         } catch (error) {}
      };
      fetchApi();
   }, []);
   const handleChaneStatus = (e, id) => {
      const stt = e.target.value;

      confirmStatusOrder(id, stt);
   };

   return (
      <>
         <Container fluid>
            <Row>
               <Col md="12">
                  <Card className="strpied-tabled-with-hover">
                     <Card.Header>
                        <Card.Title as="h4">Danh sách đơn hàng</Card.Title>
                     </Card.Header>
                     <Card.Body className="table-full-width table-responsive px-0">
                        <Table className="table-hover table-striped">
                           <thead>
                              <tr>
                                 <th className="border-0">STT</th>
                                 <th className="border-0">ID</th>
                                 <th className="border-0">email</th>
                                 <th className="border-0">Số điên thoại</th>
                                 <th className="border-0">Sản phẩm</th>
                                 <th className="border-0">Tổng tiền</th>
                                 <th className="border-0">trạng thái</th>
                              </tr>
                           </thead>
                           <tbody>
                              {order &&
                                 order.map((item, key) => {
                                    return (
                                       <tr key={key}>
                                          <td>1</td>
                                          <td>{item.id}</td>
                                          <td>
                                             {item.User
                                                ? item.User.email
                                                : item.Customer.email}
                                          </td>
                                          <td>{item.phone}</td>
                                          <td className="d-print-flex">
                                             {item.Products.map((i, k) => {
                                                return (
                                                   <div key={k}>
                                                      {i.name} *
                                                      {i.Order_item.quantity}
                                                   </div>
                                                );
                                             })}
                                          </td>
                                          <td>{setVND(item.price_total)}</td>
                                          <td>
                                             <Form.Group as={Col} md="4">
                                                <select
                                                   onChange={(e) =>
                                                      handleChaneStatus(
                                                         e,
                                                         item.id,
                                                      )
                                                   }
                                                   style={{
                                                      minWidth: '160px',
                                                   }}
                                                   name="category_id"
                                                   class="custom-select"
                                                   id="validationCustom03"
                                                   // onChange={handleChange}
                                                   required
                                                >
                                                   {OrderStatus.map(
                                                      (orderItem, key) => {
                                                         return (
                                                            <option
                                                               selected={
                                                                  item.status ===
                                                                  orderItem
                                                                     ? true
                                                                     : false
                                                               }
                                                               key={key}
                                                               value={orderItem}
                                                            >
                                                               {orderItem}
                                                            </option>
                                                         );
                                                      },
                                                   )}
                                                </select>
                                                <div class="invalid-feedback">
                                                   Please select a valid state.
                                                </div>
                                             </Form.Group>
                                             <Form.Control.Feedback type="invalid">
                                                Vui lòng chọn danh mục
                                             </Form.Control.Feedback>
                                          </td>
                                          <td>
                                             <Link
                                                to={`/admin/don-hang/chi-tiet/${item.id}`}
                                             >
                                                <Button>
                                                   <i class="fas fa-eye"></i>
                                                </Button>
                                             </Link>
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
         </Container>
      </>
   );
}

export default Order;
