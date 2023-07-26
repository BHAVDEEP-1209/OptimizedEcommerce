import {Routes , Route} from "react-router-dom";
import Register from "./pages/Register"
import Login from "./pages/Login"
import Homepage from "./pages/Homepage"
import AddProduct from "./pages/AddProduct"
import ProductDetail from "./pages/ProductDetail"
import "./Styles/App.scss"
import Profile from "./pages/Profile";
import Store from "./components/Store";
import Account from "./components/Account";
import Orders from "./components/Orders";
import Drafts from "./components/Drafts";
import Cart from "./pages/Cart";
import OrdersPage from "./pages/OrdersPage";
import Checkout from "./pages/Checkout"
import { useSelector } from "react-redux";
import Fashion from "./pages/Fashion";
import Skincare from "./pages/Skincare";
import Jewelry from "./pages/Jewelry";
import MakeUp from "./pages/MakeUp";
import Watches from "./pages/Watches";
import OrderHistory from "./pages/OrderHistory";
import VendorList from "./components/VendorList";
import ProfileIndex from "./pages/ProfileIndex";
import AllOrders from "./pages/AllOrders"
import AllOrdersHistory from "./pages/AllOrdersHistory"
import ChatPage from "./pages/ChatPage";

function App() {
  const isLoggedIn = useSelector(state=>state.isLoggedIn);

  const private1 = [
    {
      path : "/register",
      element : <Register />
    },
    {
      path : "/",
      element : <Login />
    },
    {
      path : "*",
      element : <Login />
    },
  ]


  const private2 = [
    {
      path : "/homepage",
      element : <Homepage />
    },
    {
      path : "/addProduct",
      element : <AddProduct />
    },
    {
      path : "/cart",
      element : <Cart />
    },
    {
      path : "/checkout",
      element : <Checkout />
    },
    {
      path : "/productDetail/:id",
      element : <ProductDetail />
    },
    {
      path : "/addProduct/:id",
      element : <AddProduct />
    },
    {
      path : "/orders",
      element : <OrdersPage />
    },
    {
      path : "/chat",
      element : <ChatPage />
    },
    {
      path : "/watches",
      element : <Watches />
    },
    {
      path : "/fashion",
      element : <Fashion />
    },
    {
      path : "/skincare",
      element : <Skincare />
    },
    {
      path : "/jewelry",
      element : <Jewelry />
    },
    {
      path : "/makeup",
      element : <MakeUp />
    },
    {
      path : "*",
      element : <Homepage />
    },
  ]
  return (
    <div className="App">
      <Routes>
        {
          isLoggedIn ? <>
          {
            private2.map((ele)=>{
              return <Route path={ele.path} element={ele.element} />
            })
          }
          </> : <>
          {
            private1.map((ele)=>{
              return <Route path={ele.path} element={ele.element} />
            })
          }
          </>
        }
        {
          isLoggedIn && <Route path="profile" element={<Profile />}>
          <Route index element={<ProfileIndex />} />
          <Route path="store" element={<Store />} />
          <Route path="drafts" element={<Drafts />} />
          <Route path="account" element={<Account />} />
          <Route path="orders" element={<Orders />} />
          <Route path="history" element={<OrderHistory />} />
          <Route path="vendors" element={<VendorList />} />
          <Route path="allOrders" element={<AllOrders />} />
          <Route path="*" element={<Login />} />

          <Route path="allOrdersHistory" element={<AllOrdersHistory />} />
        </Route>
        }

      </Routes>
    </div>
  );
}

export default App;