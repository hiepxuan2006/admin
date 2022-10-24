import { useContext } from 'react';
import { Button, Container, Dropdown, Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import { DataContext } from 'components/DataProvider';
import routes from 'routes.js';

function Header() {
   const location = useLocation();
   const { isLogin, user } = useContext(DataContext);

   const mobileSidebarToggle = (e) => {
      e.preventDefault();
      document.documentElement.classList.toggle('nav-open');
      var node = document.createElement('div');
      node.id = 'bodyClick';
      node.onclick = function () {
         this.parentElement.removeChild(this);
         document.documentElement.classList.toggle('nav-open');
      };
      document.body.appendChild(node);
   };

   const getBrandText = () => {
      for (let i = 0; i < routes.length; i++) {
         if (
            location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1
         ) {
            return routes[i].name;
         }
      }
      return 'Brand';
   };
   return (
      <Navbar className="position-sticky fixed-top" bg="light" expand="lg">
         <Container fluid>
            <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
               <Button
                  variant="dark"
                  className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
                  onClick={mobileSidebarToggle}
               >
                  <i className="fas fa-ellipsis-v"></i>
               </Button>
               <Navbar.Brand
                  href="#home"
                  onClick={(e) => e.preventDefault()}
                  className="mr-2"
               >
                  {getBrandText()}
               </Navbar.Brand>
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
               <span className="navbar-toggler-bar burger-lines"></span>
               <span className="navbar-toggler-bar burger-lines"></span>
               <span className="navbar-toggler-bar burger-lines"></span>
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="nav mr-auto" navbar>
                  <Nav.Item>
                     <Nav.Link
                        data-toggle="dropdown"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        className="m-0"
                     >
                        <i className="nc-icon nc-palette"></i>
                        <span className="d-lg-none ml-1">Admin store</span>
                     </Nav.Link>
                  </Nav.Item>
               </Nav>
               <Nav className="ml-auto" navbar>
                  <Dropdown as={Nav.Item}>
                     <Dropdown.Toggle
                        aria-expanded={false}
                        aria-haspopup={true}
                        as={Nav.Link}
                        data-toggle="dropdown"
                        id="navbarDropdownMenuLink"
                        variant="default"
                        className="m-0"
                     >
                        <span className="no-icon">
                           {isLogin && user ? user.name : 'Tài khoản'}
                        </span>
                     </Dropdown.Toggle>
                     {isLogin && user ? (
                        <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">
                           <Dropdown.Item
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                           >
                              {user.name}
                           </Dropdown.Item>
                           <div className="divider"></div>
                           <Dropdown.Item
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                           >
                              Đăng Xuất
                           </Dropdown.Item>
                        </Dropdown.Menu>
                     ) : (
                        <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">
                           <Dropdown.Item
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                           >
                              Action
                           </Dropdown.Item>
                           <div className="divider"></div>
                           <Dropdown.Item
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                           >
                              <Link to="/login">Đăng nhập</Link>
                           </Dropdown.Item>
                        </Dropdown.Menu>
                     )}
                  </Dropdown>
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
}

export default Header;
