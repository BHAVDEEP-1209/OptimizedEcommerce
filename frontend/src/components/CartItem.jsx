import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "../Styles/CartItem.scss";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { addToCart, deleteCartItem, updateCart } from "../utils/utils";
import { useLocation } from "react-router-dom";
import "../Styles/Cart.scss";
import { Button, notification, Space } from "antd";
import { Select } from "antd";
import Loader from "../components/Loader";

const CartItem = (props) => {
  const product = props.state.product;
  const baseImgUrl = `http://localhost:5000/images/`;
  const image = baseImgUrl + `${product.images[0]}`;
  const [quan, setQuan] = useState(props.state.quantity);
  const [onLoad, setLoad] = useState(false);
  const location = useLocation().pathname;
  const [loading, setLoading] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState(props.state?.quantity * product?.price);
  const newPrice = calculatedPrice - (calculatedPrice * 0.20);

  let nq = quan;
  ////////////////////notification
  const [api, contextHolder] = notification.useNotification();
  let msg = useState("");
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: msg,
    });
  };
  //////////////////////////

  const handleAdd = async () => {
    if (quan < product?.stock) {
      nq = quan + 1;
      setQuan(nq);
    } else {
      msg = "Cannot Exceed Stock Quantity!";
      openNotificationWithIcon("warning");
    }
  };

  const handleSub = async () => {
    if (quan > 1) {
      nq = quan - 1;
      setQuan(nq);
    }
  };

  //////////////////// delete
  const handleDelete = async () => {
    setLoading(true);

    try {
      const del = await deleteCartItem(props.state.id);

      msg = "Item Deleted!";
      openNotificationWithIcon("success");

      setLoading(false);

      props.st.setClick((prev) => {
        return !prev;
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  //////////////////////////

  useEffect(() => {
    if (onLoad) {
      const setData = setTimeout(async () => {
        try {
          const updated = await updateCart(props.state._id, { quantity: quan });
        } catch (error) {
          console.log(error);
        }
      }, 100);

      return () => clearTimeout(setData);
    }

    setLoad(true);
  }, [quan]);

  console.log("stock", product.stock);

  return (
    <>
      <div className="cartItem">
        {contextHolder}
        <div className="left">
          <img src={image} alt="" />
        </div>
        <div className="right">
          <div className="header">
            <div className="leftInfo">
              <h1>{product?.name}</h1>
              <span>Quanitity:{props.state?.quantity}</span>
              <div className="priceInfo">
                <span>Item-Price:{product?.price}</span>
                <span className={props.st.dis && "old"}>Order Price: {props.state?.quantity * product?.price}</span>
                {
                  props.st.dis == true && <span>New Price:{Math.round(newPrice)}!</span>
                }
              </div>

            </div>
            {location == "/cart" && (
              <>
                {loading ? (
                  <Loader />
                ) : (
                  <div className="delete" onClick={handleDelete}>
                    <DeleteIcon />
                  </div>
                )}
              </>
            )}
          </div>
          <div className="seller">
            <span>
              Seller:{" "}
              <span className="span2">
                {(product?.uploadedByName).toUpperCase()}
              </span>
            </span>
          </div>
          <div className="main">
            <span>Description: {product?.description}</span>

            {/* testing  */}

            {/* <span>Calculated Price: {props.state?.quantity * product?.price}</span> */}


            {location == "/orders" && <span>{props.state.orderStatus}</span>}
          </div>

          {location == "/cart" && (
            <div className="footer">
              <div className="add" style={{ cursor: "pointer" }}>
                <RemoveIcon onClick={handleSub} className="icon" />
              </div>
              <h1>{quan}</h1>
              <div className="add" style={{ cursor: "pointer" }}>
                <AddIcon onClick={handleAdd} className="icon" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartItem;
