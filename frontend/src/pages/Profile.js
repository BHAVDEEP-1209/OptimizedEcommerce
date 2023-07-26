import React from "react";
import "../Styles/Profile.scss";
import Navbar from "../components/Navbar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogOut } from "../slices/userSlice";
import SettingsIcon from "@mui/icons-material/Settings";
import businessImage from "../assets/business.png";
import InventoryIcon from "@mui/icons-material/Inventory";
import upper from "../assets/up-arrow.svg";
import ArchiveIcon from "@mui/icons-material/Archive";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import plus from "../assets/add.png"

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.currentUser);
  const business = useSelector((state) => state.business);
  const logo = business?.logo;
  const baseImgUrl = `http://localhost:5000/images/${logo}`;

  const handleSignOut = () => {
    dispatch(handleLogOut());
    navigate("/login");
  };

  console.log("logo", logo);
  return (
    <>
      <Navbar />
      <div className="profile">
        <div className="leftDiv">
          <div className="header">
            <div className="h">
              <h1>Hi {user?.role}</h1>
              <SettingsIcon className="setting" />
            </div>
            {logo == "bLogo" ? (
              <img src={businessImage} alt="" />
            ) : (
              <div className="binfo">
                <img src={baseImgUrl} alt="" className="businessLogo" />
              </div>
            )}
          </div>
          <div className="footer">

            {/* admin panel */}

            {user.role == "admin" && (
              <div
                className="div div2"
                onClick={() => navigate("/profile/vendors")}
              >
                <div className="left">
                  <FormatListBulletedIcon />
                  <Link to="/profile/vendors">Vendors List</Link>
                </div>
                <img src={upper} alt="" />
              </div>
            )}

            {user.role == "admin" && (
              <div
                className="div"
                onClick={() => navigate("/profile/allOrders")}
              >
                <div className="left">
                  {/* <FormatListBulletedIcon /> */}
                  <LocalShippingIcon />
                  <Link to="/profile/allOrders">All Orders</Link>
                </div>
                <img src={upper} alt="" />
              </div>
            )}

            {user.role == "admin" && (
              <div
                className="div div2"
                onClick={() => navigate("/profile/allOrdersHistory")}
              >
                <div className="left">
                  {/* <FormatListBulletedIcon /> */}
                  <ArchiveIcon />
                  <Link to="/profile/allOrdersHistory">All Orders History</Link>
                </div>
                <img src={upper} alt="" />
              </div>
            )}

            {/* 
            vendor panel */}
            {user.role != "customer" && (
              <div className="div" onClick={() => navigate("/profile/store")}>
                <div className="left">
                  <InventoryIcon />
                  <Link to="/profile/store">Store</Link>
                </div>
                <img src={upper} alt="" />
              </div>
            )}

            {user.role != "customer" && (
              <div
                className="div div2"
                onClick={() => navigate("/profile/drafts")}
              >
                <div className="left">
                  <ArchiveIcon />
                  <Link to="/profile/drafts">Drafts</Link>
                </div>
                <img src={upper} alt="" />
              </div>
            )}

            {/* customer panel */}

            <div className="div" onClick={() => navigate("/profile/account")}>
              <div className="left">
                <SettingsIcon />
                <Link to="/profile/account">Account</Link>
              </div>
              <img src={upper} alt="" />
            </div>

            {user.role != "customer" && (
              <div
                className="div div2"
                onClick={() => navigate("/profile/orders")}
              >
                <div className="left">
                  <LocalShippingIcon />
                  <Link to="/profile/orders">My Customer Orders</Link>
                </div>
                <img src={upper} alt="" />
              </div>
            )}

            {user.role != "customer" && (
              <div
                className="div "
                onClick={() => navigate("/profile/history")}
              >
                <div className="left">
                  <ArchiveIcon />
                  <Link to="/profile/history">My Customers Orders History</Link>
                </div>
                <img src={upper} alt="" />
              </div>
            )}
            <div className="div div2" onClick={handleSignOut}>
              <div className="left">
                <ExitToAppIcon />
                <Link>Sign Out</Link>
              </div>
              <img src={upper} alt="" />
            </div>
          </div>
        </div>
        <div className="rightDiv">
          <Outlet />
        </div>

        {
        user?.role != "customer" && <img src={plus} alt="" className='plusIcon' onClick={()=>navigate("/addProduct")}/>
      }
      </div>
    </>
  );
};

export default Profile;
