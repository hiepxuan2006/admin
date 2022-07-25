import { DataContext } from 'components/DataProvider';
import React, { useContext, useState } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { Redirect, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import acountService from 'services/acountService';
import { TOKEN_NAME } from 'utils/Contants';

function Login() {
   const { isLogin, loading } = useContext(DataContext);
   const [isloading, setLoding] = useState(false);
   const [validated, setValidated] = useState(false);
   const { setIsLogin } = useContext(DataContext);
   const [valueForm, setValueForm] = useState({
      email: 'hiepxuan2605@gmail.com',
      password: '123456',
   });
   const { email, password } = valueForm;
   const history = useHistory();

   const handleChangeValue = (e) => {
      setValueForm({ ...valueForm, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
         event.stopPropagation();
         setValidated(true);
      } else {
         try {
            setLoding(true);
            const results = await acountService.login(valueForm);
            setLoding(false);

            if (results.success) {
               toast.success(`${results.message}`, {
                  className: 'toast__item',
               });
               console.log(results);
               localStorage.setItem(TOKEN_NAME, results.token);
               setIsLogin(true);
               return history.push('/admin/dashboard');
            } else {
               toast.danger(`${error.message}`);
            }
         } catch (error) {
            console.log(error);
            setLoding(false);
            toast.warning(`${error.response.data.message}`);
         }
      }
   };
   if (loading)
      return (
         <>
            <div className="d-flex justify-content-center mt-5">
               <Spinner animation="border" variant="info" />
            </div>
         </>
      );
   else if (isLogin) return <Redirect to="/" />;
   else {
      return (
         <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            style={{
               height: '100vh',
               backgroundImage:
                  'url(https://allimages.sgp1.digitaloceanspaces.com/wikilaptopcom/2021/01/1610789626_621_Background-co-dep-nhat.jpg)',
               backgroundRepeat: 'no-repeat',
               backgroundPosition: 'center',
               backgroundAttachment: 'fixed',
               width: '100%',
            }}
            className="d-flex align-items-center justify-content-center bg-gradient-info"
         >
            <Row
               className="mb-3 align-items-center justify-content-center rounded-lg "
               // style={{ height: '400px', width: '600px' }}
            >
               <Col
                  md="8"
                  className="d-flex   align-items-center justify-content-center"
                  style={{
                     width: '900px',
                     minHeight: '300px',
                     border: '1px solid #333',
                     borderRadius: '20px',
                     // backgroundImage:'url()'
                     backgroundColor: '#fff',
                     padding: '10px',
                  }}
               >
                  <div
                     style={{
                        // border: '1px solid #ccc',
                        padding: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        flex: 1,
                     }}
                  >
                     <h2>Đăng nhập</h2>
                     <Form.Group controlId="validationCustom04">
                        <Form.Label style={{ fontSize: '20px' }}>
                           Email
                        </Form.Label>
                        <Form.Control
                           style={{ borderRadius: '10px', fontSize: '16px' }}
                           type="email"
                           placeholder="Nhập email"
                           required
                           name="email"
                           onChange={handleChangeValue}
                           value="hiepxuan2605@gmail.com"
                        />
                        <Form.Control.Feedback type="invalid">
                           Vui lòng nhập email!
                        </Form.Control.Feedback>
                     </Form.Group>
                     <Form.Group
                        className="mt-3"
                        controlId="validationCustom05"
                     >
                        <Form.Label style={{ fontSize: '20px' }}>
                           Password
                        </Form.Label>
                        <Form.Control
                           style={{ borderRadius: '10px', fontSize: '16px' }}
                           type="password"
                           placeholder="Nhập password"
                           required
                           name="password"
                           onChange={handleChangeValue}
                           value="123456"
                        />
                        <Form.Control.Feedback type="invalid">
                           Vui lòng nhập password!
                        </Form.Control.Feedback>
                     </Form.Group>

                     <Button
                        className="mt-3 m"
                        style={{
                           borderRadius: '10px',
                           color: '#000',
                           fontSize: '20px',
                           marginBottom: '24px',
                           width: '150px',
                           height: '50px',
                        }}
                        variant="outline-secondary"
                        type="submit"
                     >
                        {isloading ? (
                           <div className="loading">
                              <i class="fa fa-spinner loading-icon"></i>
                           </div>
                        ) : (
                           'Đăng nhập'
                        )}
                     </Button>
                  </div>
                  <Card style={{ flex: 1, border: 'none' }}>
                     <Card.Img
                        variant="top"
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                     />
                  </Card>
               </Col>
            </Row>
         </Form>
      );
   }
}
export default Login;
