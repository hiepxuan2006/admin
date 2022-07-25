import ReactDOM from 'react-dom/client';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './assets/css/animate.min.css';
import './assets/css/demo.css';
import './assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0';

import { DataProvider } from 'components/DataProvider';
import Notify from 'components/Notify';
import PrivateRoute from 'utils/PrivateRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
   <DataProvider>
      <BrowserRouter>
         <Notify />
         <Switch>
            <Route
               path="/admin"
               render={(props) => <PrivateRoute {...props} />}
            />
            <Redirect from="/" to="/admin/dashboard" />
         </Switch>
      </BrowserRouter>
   </DataProvider>,
);
