import { DataContext } from 'components/DataProvider';
import React, { useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import AdminLayout from 'layouts/Admin.js';
import Login from 'views/Login';

function PrivateRoute({ ...props }) {
   const { isLogin, loading } = useContext(DataContext);
   console.log(loading);
   if (loading)
      return (
         <>
            <div className="d-flex justify-content-center mt-5">
               <Spinner animation="border" variant="info" />
            </div>
         </>
      );
   return (
      <Switch>
         <Route
            {...props}
            render={(props) =>
               isLogin ? (
                  <>
                     <AdminLayout {...props} />
                  </>
               ) : (
                  <Login />
               )
            }
         ></Route>
         {/* <Route path="/login" render={() => < />} /> */}
      </Switch>
   );
}

export default PrivateRoute;
