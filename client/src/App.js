import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import { Public, Home, Login, Services, DetailProduct, Blogs, Products, FAQ, FinalRegister, ResetPassword } from './pages/public';
import { AdminLayout, ManageOrder, DashBoard, ManageProduct, ManageUser, CreateProduct } from './pages/admin';
import { MemberLayout, Personal } from './pages/member';
import { Modal } from './components';
import path from './utils/path';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from './store/app/asyncActions';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const { isShowModal, modalChildren } = useSelector(state => state.app)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCategories())
  }, [])
  return (
    <div className="font-main relative">
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.BLOGS} element={<Blogs />} />
          <Route path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE} element={<DetailProduct />} />
          <Route path={path.FAQ} element={<FAQ />} />
          <Route path={path.OUR_SERVICES} element={<Services />} />
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
          <Route path={path.ALL} element={<Home />} />
        </Route>
        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<DashBoard />} />
          <Route path={path.MANAGER_USER} element={<ManageUser />} />
          <Route path={path.MANAGER_PRODUCT} element={<ManageProduct />} />
          <Route path={path.MANAGER_ORDER} element={<ManageOrder />} />
          <Route path={path.CREATE_PRODUCT} element={<CreateProduct />} />
        </Route>
        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PERSONAL} element={<Personal />} />
        </Route>
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />

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
