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
import sliderServices from 'services/sliderServices';
import confirmDelete from 'utils/confirmDelete';
import { BaseUrl } from 'utils/Contants';
function Slider(props) {
   const [slider, setSlider] = useState();
   useEffect(() => {
      const fetchApi = async () => {
         const results = await sliderServices.getAllSlider();
         setSlider(results.data);
      };
      fetchApi();
   }, []);

   const handleDeleteSlider = async (id) => {
      const url = 'slider';
      const isDel = await confirmDelete({ url, params: { id } });
      if (isDel) {
         const del = slider.filter((i) => {
            return i.id !== id;
         });

         setSlider(del);
      }
   };

   return (
      <>
         <Container fluid>
            <Row>
               <Col md="12">
                  <Card className="strpied-tabled-with-hover">
                     <div>
                        <Button className="ml-3 mt-2" variant="success">
                           <Link to={'/admin/slider/them-slider'}>
                              Thêm mới
                           </Link>
                        </Button>
                        <Card.Header>
                           <Card.Title as="h4">Danh sách slider</Card.Title>
                        </Card.Header>
                     </div>
                     <Card.Body className="table-full-width table-responsive px-0">
                        <Table className="table-hover table-striped">
                           <thead>
                              <tr>
                                 <th className="border-0">STT</th>
                                 <th className="border-0">ID</th>
                                 <th className="border-0">Name</th>
                                 <th className="border-0">Ảnh</th>
                                 <th className="border-0">Action</th>
                              </tr>
                           </thead>
                           <tbody>
                              {slider &&
                                 slider.map((item, key) => {
                                    return (
                                       <tr>
                                          <td>1</td>
                                          <td>{item.id}</td>
                                          <td>{item.name}</td>
                                          <td>
                                             <img
                                                style={{
                                                   height: '70px',
                                                   width: '140px',
                                                }}
                                                src={`${BaseUrl}${item.image_path}`}
                                                alt=""
                                             />
                                          </td>
                                          <td>
                                             <Button
                                                onClick={() =>
                                                   handleDeleteSlider(item.id)
                                                }
                                                variant="danger"
                                             >
                                                <i class="fas fa-trash"></i>
                                             </Button>
                                             <Button variant="warning">
                                                <i className="fas fa-edit"></i>
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
         </Container>
      </>
   );
}

export default Slider;
