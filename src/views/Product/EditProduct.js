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
   Form,
} from 'react-bootstrap';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { BaseUrl } from 'utils/Contants';
import { useHistory, useParams } from 'react-router-dom';
import categoryServices from 'services/categoryServices';
import productService from 'services/productService';
import { toast } from 'react-toastify';
function EditProduct(props) {
   const [validated, setValidated] = useState(false);
   const [category, setCategory] = useState([]);
   const [loading, setLoading] = useState(false);
   const [product, setProduct] = useState({});
   const [valueForm, setValueForm] = useState({
      name: '',
      price: '',
      category_id: '',
      imageFile: '',
      description: '',
   });
   const { name, price, category_id, imageFile, description } = valueForm;
   const history = useHistory();
   const { id } = useParams();

   const handleChange = (e) => {
      setValueForm({ ...valueForm, [e.target.name]: e.target.value });
   };

   const handleChangeImage = (e) => {
      setValueForm({ ...valueForm, imageFile: e.target.files[0] });
   };
   useEffect(() => {
      const fethApi = async () => {
         const results = await categoryServices.getAllCategory();
         const productResults = await productService.getProduct({ id: id });
         setCategory(results.data);
         setProduct(productResults.data);
         setValueForm({
            ...valueForm,
            name: productResults.data.name,
            price: productResults.data.price,
            category_id: productResults.data.category_id,
            description: productResults.data.content,
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
      if (name) formData.append('name', name);
      if (price) formData.append('price', price);
      if (category_id) formData.append('category_id', category_id);
      if (imageFile) formData.append('image_path', imageFile);
      if (description) formData.append('content', description);
      try {
         setLoading(true);
         const results = await productService.updateProduct(formData, id);
         setLoading(false);
         if (results.success) {
            toast.success(`${results.message}`);
            return history.push('/admin/san-pham');
         }
      } catch (error) {
         setLoading(false);
         toast.warning(`${error.message}`);
      }
   };

   return (
      <div>
         {product && (
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
               <Row className="mb-3">
                  <Form.Group as={Col} md="4" controlId="validationCustom01">
                     <Form.Label>Tên sản phẩm</Form.Label>
                     <Form.Control
                        required
                        name="name"
                        onChange={handleChange}
                        type="text"
                        placeholder="First name"
                        defaultValue={product.name}
                     />
                     <Form.Control.Feedback type="invalid">
                        Vui lòng nhập !
                     </Form.Control.Feedback>
                  </Form.Group>
               </Row>
               <Row>
                  <Form.Group as={Col} md="4" controlId="validationCustom02">
                     <Form.Label>Giá sản phẩm</Form.Label>

                     <Form.Control
                        type="text"
                        name="price"
                        onChange={handleChange}
                        required
                        defaultValue={product.price}
                     />
                     <Form.Control.Feedback type="invalid">
                        Vui lòng nhập giá
                     </Form.Control.Feedback>
                  </Form.Group>
               </Row>
               <Row>
                  <Form.Group as={Col} md="4" className="mt-4">
                     <Form.Label>Danh mục sản phẩm</Form.Label>
                     <select
                        name="category_id"
                        className="custom-select"
                        id="validationCustom03"
                        onChange={handleChange}
                        required
                     >
                        <option selected disabled value="">
                           Chọn danh mục
                        </option>
                        {category &&
                           category.map((item, key) => {
                              return (
                                 <option
                                    key={key}
                                    value={item.id}
                                    selected={
                                       item.id === product.category_id
                                          ? true
                                          : ''
                                    }
                                 >
                                    {item.name}
                                 </option>
                              );
                           })}
                     </select>
                     <div className="invalid-feedback">
                        Please select a valid state.
                     </div>
                  </Form.Group>
                  <Form.Control.Feedback type="invalid">
                     Vui lòng chọn danh mục
                  </Form.Control.Feedback>
               </Row>
               <Row className="mb-3">
                  <Form.Group
                     className="mt-4"
                     as={Col}
                     md="4"
                     controlId="validationCustom04"
                  >
                     <Form.Label>Ảnh</Form.Label>
                     <Form.Control
                        type="file"
                        placeholder="City"
                        name="imageFile"
                        onChange={handleChangeImage}
                     />
                     <Form.Control.Feedback type="invalid">
                        Please provide a valid city.
                     </Form.Control.Feedback>
                  </Form.Group>
               </Row>
               <Row>
                  <Card className="ml-3" style={{ width: '18rem' }}>
                     <Card.Img
                        variant="top"
                        src={`${BaseUrl}${product.feature_image_path}`}
                     />
                  </Card>
               </Row>
               <Row>
                  <Form.Group md="12" as={Col} controlId="validationCustom05">
                     <Form.Label>Mô tả sản phẩm</Form.Label>
                     <CKEditor
                        id="validationCustom05"
                        required
                        editor={ClassicEditor}
                        onBlur={(event, editor) => {
                           setValueForm({
                              ...valueForm,
                              description: editor.getData(),
                           });
                        }}
                        config={{
                           ckfinder: {
                              uploadUrl: `${BaseUrl}upload`,
                           },
                        }}
                        data={product.content}
                     />
                     <div className="invalid-feedback">
                        Please select a valid state.
                     </div>
                  </Form.Group>
               </Row>
               {loading ? (
                  <Button
                     disabled
                     className="loading"
                     style={{ width: '180px' }}
                  >
                     <i class="fas fa-spinner loading-icon"></i>
                  </Button>
               ) : (
                  <Button
                     className="mt-5"
                     type="submit"
                     style={{ width: '180px' }}
                  >
                     Cập nhật sản phẩm
                  </Button>
               )}
            </Form>
         )}
      </div>
   );
}

export default EditProduct;
