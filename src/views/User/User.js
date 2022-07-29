import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import userService from 'services/userService';
import { setVND } from 'utils/curentVND';

function User() {
   const [isProfile, setIsProfile] = useState(false);
   const [listUser, setListUser] = useState([]);
   const [userItem, setUserItem] = useState({});

   useEffect(() => {
      const fetchApi = async () => {
         try {
            const results = await userService.getListUser();
            if (results.success) {
               setListUser(results.data);
            }
         } catch (error) {}
      };
      fetchApi();
   }, []);
   const handleView = (e, id) => {
      e.preventDefault();
      console.log(listUser[id]);
      setUserItem(listUser[id]);
      setIsProfile(!isProfile);
   };
   console.log(userItem);
   return (
      <>
         <Container fluid>
            <Row>
               <Col md="12" className={isProfile ? 'd-none' : ''}>
                  <Card>
                     <Card.Header>
                        <Card.Title as="h4">Danh sách khách hàng</Card.Title>
                     </Card.Header>
                     <Card.Body>
                        <Table className="table-hover table-striped">
                           <thead>
                              <tr>
                                 <th className="border-0">STT</th>
                                 <th className="border-0">Tên khách hàng</th>
                                 <th className="border-0">Email</th>
                                 <th className="border-0"></th>
                              </tr>
                           </thead>
                           <tbody>
                              {listUser &&
                                 listUser.map((user, key) => {
                                    return (
                                       <tr key={key}>
                                          <td>1</td>
                                          <td>{user.name}</td>
                                          <td>{user.email}</td>
                                          <td>
                                             <Button
                                                onClick={(e) =>
                                                   handleView(e, key)
                                                }
                                             >
                                                <i class="fas fa-eye"></i>
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
            <Row className={isProfile ? '' : 'd-none'}>
               <Col md="3" style={{ height: '100%' }}>
                  <Card className="card-user">
                     <div className="card-image">
                        <img
                           alt="..."
                           src={require('assets/img/photo-1431578500526-4d9613015464.jpeg')}
                        ></img>
                     </div>
                     <Card.Body>
                        <div className="author">
                           <div onClick={(e) => e.preventDefault()}>
                              <img
                                 alt="..."
                                 className="avatar border-gray"
                                 src={require('assets/img/logoFarm.png')}
                              ></img>
                              <h4 style={{ margin: '0' }} className="title">
                                 {userItem && userItem.name}
                              </h4>
                           </div>
                           <p className="description">
                              {userItem && userItem.email}
                           </p>
                        </div>
                     </Card.Body>
                     <hr></hr>
                     <div className="button-container mr-auto ml-auto">
                        <Button
                           className="btn-simple btn-icon"
                           onClick={(e) => {
                              e.preventDefault();
                              setIsProfile(!isProfile);
                           }}
                           variant="link"
                        >
                           <p>Danh sách khách hàng</p>
                        </Button>
                     </div>
                  </Card>
               </Col>
               <Col md="9">
                  <Card.Title style={{ margin: '0' }} as="h3">
                     Đơn hàng đã đặt
                  </Card.Title>

                  <Card.Body>
                     <Table className="table-hover table-striped">
                        <thead>
                           <tr>
                              <th className="border-0">STT</th>
                              <th className="border-0">Sản phẩm</th>
                              <th className="border-0">Trạng thái</th>
                              <th className="border-0">Giá trị:</th>
                              <th className="border-0"></th>
                           </tr>
                        </thead>
                        <tbody>
                           {userItem &&
                           userItem.Orders &&
                           userItem.Orders.length <= 0 ? (
                              <tr>
                                 <td colSpan={5}>Chưa có đơn hàng nào!</td>
                              </tr>
                           ) : (
                              userItem &&
                              userItem.Orders &&
                              userItem.Orders.map((order, key) => {
                                 return (
                                    <tr key={key}>
                                       <td>1</td>
                                       <td>
                                          {order.Products.map((p, k) => {
                                             return (
                                                <div key={k}>
                                                   {p.name} *{' '}
                                                   {p.Order_item.quantity}
                                                </div>
                                             );
                                          })}
                                       </td>
                                       <td>{order.status}</td>
                                       <td>{setVND(order.price_total)}</td>
                                       <td>
                                          <Link
                                             to={`/admin/don-hang/chi-tiet/${order.id}`}
                                          >
                                             <Button>
                                                <i class="fas fa-eye"></i>
                                             </Button>
                                          </Link>
                                       </td>
                                    </tr>
                                 );
                              })
                           )}
                        </tbody>
                     </Table>
                  </Card.Body>
               </Col>
            </Row>
         </Container>
      </>
   );
}

export default User;
