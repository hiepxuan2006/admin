import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import categoryServices from 'services/categoryServices';
import sliderServices from 'services/sliderServices';
function AddSlider(props) {
   const [validated, setValidated] = useState(false);
   const [valueForm, setValueForm] = useState({
      name: '',
      imageFile: '',
   });
   const { name, imageFile } = valueForm;
   const history = useHistory();
   const changeForm = (e) => {
      setValueForm({ ...valueForm, [e.target.name]: e.target.value });
   };
   const changeImage = (e) => {
      setValueForm({ ...valueForm, imageFile: e.target.files[0] });
   };
   console.log(valueForm);
   const handleSubmit = async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
         event.stopPropagation();
         setValidated(true);
      } else {
         try {
            const dataForm = new FormData();
            dataForm.append('name', name);
            dataForm.append('image_path', imageFile);
            const results = await sliderServices.addSLider(dataForm);
            if (results.success) {
               toast.success('Thêm thành công');
               return history.push('/admin/slider');
            }
         } catch (error) {}
      }
   };
   return (
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
         <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
               <Form.Label>Tên Slider</Form.Label>
               <Form.Control
                  name="name"
                  required
                  type="text"
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

         <Button className="mt-5" type="submit">
            Thêm Slider
         </Button>
      </Form>
   );
}

export default AddSlider;
