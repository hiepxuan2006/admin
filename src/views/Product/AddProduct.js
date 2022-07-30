import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import categoryServices from 'services/categoryServices';
import productService from 'services/productService';
import { BaseUrl } from 'utils/Contants';
function AddProduct(props) {
   const [validated, setValidated] = useState(false);
   const [category, setCategory] = useState([]);
   const [loading, setLoading] = useState(false);
   const [valueForm, setValueForm] = useState({
      name: '',
      price: '',
      category_id: '',
      imageFile: '',
      description: '',
   });
   const { name, price, category_id, imageFile, description } = valueForm;

   const history = useHistory();

   const handleChange = (e) => {
      setValueForm({ ...valueForm, [e.target.name]: e.target.value });
   };

   const handleChangeImage = (e) => {
      setValueForm({ ...valueForm, imageFile: e.target.files[0] });
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
         event.stopPropagation();
         setValidated(true);
      }
      const dataForm = new FormData();
      dataForm.append('name', name);
      dataForm.append('price', price);
      dataForm.append('category_id', category_id);
      dataForm.append('image_path', imageFile);
      dataForm.append('content', description);
      setLoading(true);
      const results = await productService.addProduct(dataForm);
      setLoading(false);
      if (results.success) {
         toast.success(`${results.message}`);
         return history.push('/admin/san-pham');
      }
   };

   useEffect(() => {
      const fetchApi = async () => {
         const results = await categoryServices.getAllCategory();
         setCategory(results.data);
      };
      fetchApi();
   }, []);

   console.log(valueForm);
   return (
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
                  class="custom-select"
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
                           <option key={key} value={item.id}>
                              {item.name}
                           </option>
                        );
                     })}
               </select>
               <div class="invalid-feedback">Please select a valid state.</div>
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
                  required
                  //   onChange={changeImage}
               />
               <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
               </Form.Control.Feedback>
            </Form.Group>
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
               />
               <div class="invalid-feedback">Please select a valid state.</div>
            </Form.Group>
         </Row>

         {loading ? (
            <Button disabled className="loading" style={{ width: '180px' }}>
               <i class="fas fa-spinner loading-icon"></i>
            </Button>
         ) : (
            <Button className="mt-5" type="submit" style={{ width: '180px' }}>
               Thêm sản phẩm
            </Button>
         )}
      </Form>
   );
}

export default AddProduct;
