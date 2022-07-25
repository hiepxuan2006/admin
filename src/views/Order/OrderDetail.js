import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {
   Button,
   Card,
   Col,
   Container,
   ListGroup,
   Row,
   Table,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import orderService from 'services/orderService';
import { setVND } from 'utils/curentVND';
import moment from 'moment';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { BaseUrl } from 'utils/Contants';
function OrderDetail(props) {
   const { id } = useParams();
   const [order, setOrder] = useState();
   useEffect(() => {
      const fetchApi = async () => {
         const results = await orderService.getOneOrder(id);
         setOrder(results.data);
      };
      fetchApi();
   }, []);

   const exportPDF = () => {
      const input = document.getElementById('content');
      html2canvas(input).then((canvas) => {
         const imgData = canvas.toDataURL('img/png');
         const pdf = new jsPDF();
         pdf.addImage(imgData, 'PNG', 0, 0);
         pdf.save('File.pdf');
      });
      console.log(input);
   };
   return (
      <Container fluid>
         {order && (
            <Row>
               <Col id="content" md="12">
                  <Card className="strpied-tabled-with-hover ">
                     <Card.Header>
                        <Card.Title as="h3">Đơn hàng chi tiết</Card.Title>
                     </Card.Header>
                     <Card.Body className="table-full-width table-responsive px-0 ml-3"></Card.Body>
                     <Card.Title as="h4" className="ml-3">
                        Thông tin đơn hàng
                     </Card.Title>
                     <Row className="justify-content-left">
                        <ListGroup
                           as={Col}
                           md="11"
                           className="ml-3  "
                           variant="flush"
                        >
                           <ListGroup.Item>
                              Người đặt hàng:
                              {order.User
                                 ? order.User.name
                                 : order.Customer.name}
                           </ListGroup.Item>
                           <ListGroup.Item>
                              Số điện thoại: {order.phone}
                           </ListGroup.Item>
                           <ListGroup.Item>
                              Email:{' '}
                              {order.User
                                 ? order.User.email
                                 : order.Customer.email}
                           </ListGroup.Item>
                           <ListGroup.Item>
                              Địa chỉ: {order.address}
                           </ListGroup.Item>
                           <ListGroup.Item>
                              Thời gian đặt:{' '}
                              {moment(order.createdAt).format('LT L')}
                           </ListGroup.Item>
                        </ListGroup>
                     </Row>
                     <Card.Title as="h4" className="ml-3">
                        Sản phẩm
                     </Card.Title>
                     <Table striped bordered hover size="sm">
                        <thead>
                           <tr>
                              <th>STT</th>
                              <th>Tên sả phẩm</th>
                              <th>Ảnh</th>
                              <th>Số lượng</th>
                              <th>Đơn giá</th>
                              <th>Thành tiền</th>
                           </tr>
                        </thead>
                        <tbody>
                           {order.Products.map((itemProduct, key) => {
                              return (
                                 <tr key={key}>
                                    <td>1</td>
                                    <td>{itemProduct.name}</td>
                                    <td>
                                       <img
                                          style={{
                                             width: '100px',
                                             height: '100px',
                                          }}
                                          src={`${BaseUrl}${itemProduct.feature_image_path}`}
                                          alt=""
                                       />
                                    </td>
                                    <td>{itemProduct.Order_item.quantity}</td>
                                    <td>{setVND(itemProduct.price)}</td>
                                    <td>
                                       {setVND(
                                          itemProduct.Order_item.quantity *
                                             itemProduct.price,
                                       )}
                                    </td>
                                 </tr>
                              );
                           })}
                           <tr>
                              <td>#</td>
                              <td colSpan={4}>Tổng:</td>
                              <td>{setVND(order.price_total)}</td>
                           </tr>
                        </tbody>
                     </Table>
                  </Card>
               </Col>
            </Row>
         )}
         <Button onClick={() => exportPDF()}>xuất</Button>
      </Container>
   );
}

export default OrderDetail;
