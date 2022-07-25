import * as React from 'react';
import acountService from 'services/acountService';
import { TOKEN_NAME } from 'utils/Contants';
import * as httpRequest from 'utils/httpRequest';

export const DataContext = React.createContext();
export const DataProvider = (props) => {
   const [isLogin, setIsLogin] = React.useState(false);
   const [loading, setLoading] = React.useState(false);
   const [user, setUser] = React.useState();
   const checkLogin = async () => {
      if (localStorage[TOKEN_NAME]) {
         httpRequest.setAuthToken(localStorage[TOKEN_NAME]);
      }
      try {
         setLoading(true);
         const results = await acountService.checkLogin();
         if (results.success) {
            // localStorage.setItem('user', results.data);
            setUser(results.data);
            console.log(results);
         }
         setIsLogin(true);
         setLoading(false);
      } catch (error) {
         setIsLogin(false);
         setLoading(false);
      }
   };
   React.useEffect(() => {
      checkLogin();
   }, []);
   console.log(user);
   // console.log(isLogin);
   const value = { isLogin, loading, setIsLogin, user };
   return (
      <DataContext.Provider value={value}>
         {props.children}
      </DataContext.Provider>
   );
};
