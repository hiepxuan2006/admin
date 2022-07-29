import { DataContext } from 'components/DataProvider';
import React, { Fragment, useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import AdminLayout from 'layouts/Admin.js';
import Login from 'views/Login';

function PrivateRoute({ component: Component, ...rest }) {
   const { isLogin, loading } = useContext(DataContext);

   if (loading)
      return (
         <>
            <div className="d-flex justify-content-center mt-5">
               <Spinner animation="border" variant="info" />
            </div>
         </>
      );
   return (
      // <Switch>
      <Route
         {...rest}
         render={(props) =>
            isLogin ? (
               <>
                  <Component {...props} {...rest} />
               </>
            ) : (
               <Redirect to="/login" />
            )
         }
      ></Route>
      // </Switch>
   );
}

export default PrivateRoute;
