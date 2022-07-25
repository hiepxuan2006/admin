import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import categoryServices from 'services/categoryServices';
import { BaseUrl } from 'utils/Contants';
function EditCategory(props) {
   const [validated, setValidated] = useState(false);
   const [valueForm, setValueForm] = useState({
      name: '',
      imageFile: '',
      srcImg: '',
   });
   const { name, imageFile, srcImg } = valueForm;
   const { id } = useParams();
   const history = useHistory();

   const changeForm = (e) => {
      setValueForm({ ...valueForm, [e.target.name]: e.target.value });
   };

   const changeImage = (e) => {
      setValueForm({ ...valueForm, imageFile: e.target.files[0] });
   };

   useEffect(() => {
      const fethApi = async () => {
         const params = { id: id };
         const results = await categoryServices.getOneCategory(params);
         setValueForm({
            ...valueForm,
            name: results.data.name,
            srcImg: results.data.image_path,
         });
      };
      fethApi();
   }, []);

   const handleSubmit = async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
         event.stopPropagation();
         setValidated(true);
      }
      const formData = new FormData();
      formData.append('name', name);
      formData.append('image_path', imageFile);
      const results = await categoryServices.updateCategory(id, formData);
      if (results.success) {
         toast.success(`${results.message}`, {
            className: 'toast__item',
         });
         history.push('/admin/danh-muc');
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
                  defaultValue={name}
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
                  //   required
                  onChange={changeImage}
               />
               <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
               </Form.Control.Feedback>
            </Form.Group>
         </Row>

         <Row>
            <Card className="ml-3" style={{ width: '18rem' }}>
               <Card.Img variant="top" src={`${BaseUrl}/${srcImg}`} />
            </Card>
         </Row>

         <Button className="mt-5" type="submit">
            Cập nhật danh mục
         </Button>
      </Form>
   );
}

export default EditCategory;
