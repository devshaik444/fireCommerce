import Homepage from "./pages/Homepage";
import Cartpage from "./pages/Cartpage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import Productinfo from "./pages/Productinfo"
import './stylesheets/layout.css'
import './stylesheets/products.css'
import './stylesheets/authentication.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  BrowserRouter , Navigate, Route, Routes
} from "react-router-dom";
import OrdersPage from "./pages/OrdersPage";

const App = () => {
  return (
    <div className="App">
    <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route  path="/" exact element={<ProtectedRoutes><Homepage /></ProtectedRoutes>} />
          <Route  path="/cart" exact element={<ProtectedRoutes><Cartpage /></ProtectedRoutes>} />
          <Route  path="/orders" exact element={<ProtectedRoutes><OrdersPage /></ProtectedRoutes>} />
          <Route  path="/productinfo/:productid" exact element={<ProtectedRoutes><Productinfo /></ProtectedRoutes>} />
          <Route  path="/login" exact element={<LoginPage />} />
          <Route  path="/register" exact element={<RegisterPage/>} />
        </Routes>
      </BrowserRouter>
    </div>

  )
};

export default App;

export const ProtectedRoutes=({children})=>{
  if(localStorage.getItem('currentUser')){ //if user logged in then protected routes can be accessed by user
    return children
  }
  else{
   return <Navigate to='/login' />
  }
}