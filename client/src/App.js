import React, { useEffect } from 'react';
import {Route, Routes} from 'react-router-dom'
import {Public, Home, Login, Services, DetailProduct, Blogs, Products, FAQ, FinalRegister, ResetPassword} from './pages/public';
import path from './utils/path';
import { useDispatch } from 'react-redux';
import { getCategories } from './store/app/asyncActions';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCategories())
  },[])
  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home/>} />
          <Route path={path.BLOGS} element={<Blogs/>} />
          <Route path={path.DETAIL_PRODUCT_PID_TITLE} element={<DetailProduct/>} />
          <Route path={path.FAQ} element={<FAQ />} />
          <Route path={path.OUR_SERVICES} element={<Services/>} />
          <Route path={path.PRODUCTS} element={<Products/>} />
          <Route path={path.RESET_PASSWORD} element={<ResetPassword/>} />
        </Route>
          <Route path={path.LOGIN} element={<Login/>} />
          <Route path={path.FINAL_REGISTER} element={<FinalRegister/>} />

      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
        {/* Same as */}
      <ToastContainer />
    </div>

  );
}

export default App;
