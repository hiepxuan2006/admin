import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import categoryServices from 'services/categoryServices';
function AddCategory(props) {
   const history = useHistory();
   const params = useParams();
   const [loading, setLoading] = useState(false);
   const [validated, setValidated] = useState(false);
   const [valueForm, setValueForm] = useState({
      name: '',
      imageFile: '',
   });
   const { name, imageFile } = valueForm;

   const changeForm = (e) => {
      setValueForm({ ...valueForm, [e.target.name]: e.target.value });
   };

   const changeImage = (e) => {
      setValueForm({ ...valueForm, imageFile: e.target.files[0] });
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
         event.stopPropagation();
         setValidated(true);
      } else {
         try {
            const formData = new FormData();
            formData.append('image_path', imageFile);
            formData.append('name', name);
            setLoading(true);
            const results = await categoryServices.podtCategory(formData);
            setLoading(false);
            if (results.success) {
               toast.success(`${results.message}`, {
                  className: 'toast__item',
               });
               return history.push('/admin/danh-muc');
            }
         } catch (error) {
            setLoading(false);
            toast.warning(`${error.response.data.message}`, {
               className: 'toast__item',
            });
         }
      }
   };

   return (
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
         <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
               <Form.Label>Tên danh mục</Form.Label>
               <Form.Control
                  name="name"
                  required
                  type="text"
                  placeholder="First name"
                  onChange={changeForm}
               />
               <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
               </Form.Control.Feedback>
            </Form.Group>
         </Row>
         <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom03">
               <Form.Label>Ảnh</Form.Label>
               <Form.Control
                  type="file"
                  placeholder="City"
                  name="imageFile"
                  required
                  onChange={changeImage}
               />
               <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
               </Form.Control.Feedback>
            </Form.Group>
         </Row>
         {params.id ? (
            <Row>
               <Card className="ml-3" style={{ width: '18rem' }}>
                  <Card.Img variant="top" src="holder.js/100px180" />
               </Card>
            </Row>
         ) : (
            ''
         )}

         <Button className="mt-5" type="submit" style={{ width: '180px' }}>
            {loading ? (
               <>
                  <div className="loading">
                     <i class="fas fa-circle-notch loading-icon"></i>
                  </div>
               </>
            ) : (
               ' Thêm danh mục'
            )}
         </Button>
      </Form>
   );
}

export default AddCategory;
