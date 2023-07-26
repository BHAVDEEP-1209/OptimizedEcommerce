import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../Styles/ProductDetail.scss";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart, getProduct, getProductTotalSales } from "../utils/utils";
import down from "../assets/arrow.svg";
import up from "../assets/up-arrow.svg";
import fullStar from "../assets/fullStar.png";
import halfStar from "../assets/halfStar.png";
import info from "../assets/info.png";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import UserModal from "../components/UserModal";
import axios from "axios";
import { Button, notification, Space } from "antd";
import Loader from "../components/Loader";
import orders from "../assets/orders.png"
import money from "../assets/money.png"

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const baseImgUrl = `http://localhost:5000/images/`;
  const [click, setClick] = useState(false);
  const [click2, setClick2] = useState(false);
  const [click3, setClick3] = useState(false);
  const [count, setCount] = useState(1);
  const user = useSelector((state) => state.currentUser);
  const navigate = useNavigate();
  const address = user?.address;
  const [total,setTotal] = useState(0);

  const [loading, setLoading] = useState(false);

  ////////////////////notification
  const [api, contextHolder] = notification.useNotification();
  let msg = useState("");
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: msg,
    });
  };
  //////////////////////////

  useEffect(() => {
    const get = async () => {
      try {
        
        const result = await getProduct(id);
        setProduct(result.data);
        const totalSales = await getProductTotalSales({uploadedBy : result.data?.uploadedBy , id : result.data?._id});
        let t = 0;
        totalSales.data?.map((ele)=>{
          if(ele.discount==0){
            t = t +ele?.product?.price * ele?.quantity;
          }else{
            t = t+ele?.discount;
          }
        })

        setTotal(t);

      } catch (error) {
        console.log(error);
      }
    };
    get();
  }, []);

  const dis = click ? "block" : "none";
  const dis2 = click2 ? "block" : "none";
  const dis3 = click3 ? "block" : "none";
  const stock = product.stock > 0 ? "In Stock" : "Out Of Stock";

  const handleAddToCart = async () => {
    if (product.stock == 0) {
      msg = "Out Of Stock! Plz Check Later";
      openNotificationWithIcon("warning");
    } else {
      setLoading(true);

      const itemId = product._id + user.id;

      const cartItem = {
        product: product,
        quantity: count,
        purchasedAs: "cart",
        purchasedBy: user.id,
        id: itemId,
      };
      try {
        const res = await axios.post(
          "http://localhost:5000/cart/addToCart",
          cartItem
        );

        msg = "Added To Cart!";
        openNotificationWithIcon("success");

        setLoading(false);
        setCount(1);

      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  const handleBuy = async () => {
    if (user?.address == undefined) {
      msg = "Add Address!";
      openNotificationWithIcon("warning");

      setTimeout(() => {
        navigate(`/profile/account`);
      }, 800);
    } else if (product.stock == 0) {
      msg = "Out Of Stock! Plz Check Later";
      openNotificationWithIcon("warning");
    } else {
      if (!address.street || !address.city || !address.state || !address.pin) {
        msg = "Add Address!";
        openNotificationWithIcon("warning");

        setTimeout(() => {
          navigate(`/profile/account`);
        }, 800);

        return;
      }

      setLoading(true);
      const itemId = product._id + user.id;

      const cartItem = {
        product: product,
        quantity: count,
        purchasedAs: "cart",
        purchasedBy: user.id,
        id: itemId,
      };
      try {
        const res = await axios.post(
          "http://localhost:5000/cart/addToCart",
          cartItem
        );

        setLoading(false);
        navigate(`/checkout`);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };


  const outOfStock=()=>{

    if(count<=product?.stock){
      setCount(count+1);
    }else{
      msg = "Cannot Exceed Stock Quantity!";
      openNotificationWithIcon("warning");
    }
  }

  return (
    <>
      {contextHolder}
      <Navbar />
      <div className="productDetail">
        <div className="productContainer">
          <div className="imagesDiv">
            {product?.images?.map((photo) => {
              return <img src={baseImgUrl + `${photo}`} alt="" />;
              // return <h1>hello</h1>
            })}
          </div>
          <div className="productInfo">
            {/* header section */}
            <h3>{product?.category?.toUpperCase()}</h3>
            <h1>{product?.name?.toUpperCase()}</h1>
            <hr />
            <h2>&#x20B9; {product?.price}</h2>
            <span>all taxes and duties included</span>
            <hr />

            {/* description section */}
            <div className="description" onClick={() => setClick(!click)}>
              <h3>Description</h3>
              {!click ? (
                <img src={down} alt="" className="downIcon" />
              ) : (
                <img src={up} alt="" className="downIcon" />
              )}
            </div>

            <div className="descDetail" style={{ display: dis }}>
              {product?.description}
            </div>
            {/* <hr /> */}

            {/* review section */}
            <div className="reviewStars">
              <img src={fullStar} alt="" className="fullStar" />
              <img src={fullStar} alt="" className="fullStar" />
              <img src={fullStar} alt="" className="fullStar" />
              <img src={fullStar} alt="" className="fullStar" />
              <img src={halfStar} alt="" className="halfStar" />
              <span>({product.reviews?.length})Reviews</span>
            </div>
            <hr />

            {/* order quantity */}
            <div className="orders">
              <div
                className="add"
                onClick={() => {
                  {
                    count > 1 && setCount(count - 1);
                  }
                }}
              >
                <RemoveIcon />
              </div>
              <span>{count}</span>
              <div className="add" onClick={outOfStock}>
                <AddIcon />
              </div>
            </div>

            <div className="description2">
              <h3>Status:</h3>
              <span className="stock">{stock}</span>
            </div>
            <hr />

            {/* delivery and payments */}
            <div className="description" onClick={() => setClick3(!click3)}>
              <h3>Delivery and Payment</h3>
              {!click3 ? (
                <img src={down} alt="" className="downIcon" />
              ) : (
                <img src={up} alt="" className="downIcon" />
              )}
            </div>
            <div className="descDetail" style={{ display: dis3 }}>
              <div>
                <img src={info} alt="" />
                <span>Standard delivery in 2-7 days</span>
              </div>
              <div>
                <img src={info} alt="" />
                <span>
                  Return costs may vary, depending on the destination.
                </span>
              </div>
            </div>

            {product.uploadedBy != user?.email && (
              <>
                {loading ? (
                  <Loader />
                ) : (
                  <button onClick={handleAddToCart}>
                    <ShoppingCartIcon />
                    Add
                  </button>
                )}
                {loading ? (
                  <Loader />
                ) : (
                  <button onClick={handleBuy}>
                    <LocalMallIcon />
                    Buy
                  </button>
                )}
              </>
            )}

            {/* sales Info */}

            {
              product.uploadedBy == user?.email 
              &&
              <div className="salesInfo">
              <div className="ordersInfo">
                <img src={orders} alt="" />
                <h1 >No Of Orders:</h1>
                <span>{product?.Orders}</span>
              </div>

              <div className="ordersInfo">
                <img src={money} alt="" />
                <h1>Total Profit:{total}</h1>
                {/* <span>{product?.Orders * product?.price * }</span> */}
              </div>
            </div>
            
            }

            {/* salesInfo */}
            
          </div>

        </div>

      </div>
    </>
  );
};

export default ProductDetail;
