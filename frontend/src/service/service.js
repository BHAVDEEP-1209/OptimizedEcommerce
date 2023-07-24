import axios from "axios";

export const SignUp = (values) =>(axios.post("http://localhost:5000/auth/register",values));

export const SignIn = (values) =>(axios.post("http://localhost:5000/auth/login",values));

export const getVendorProducts = (values) =>(axios.post("http://localhost:5000/product/getVendorProducts",values));

////admin
// getAdminProducts
export const getAdminProducts = (values) =>(axios.post("http://localhost:5000/product/getAdminProducts",values));

export const getVendorsList = () =>(axios.get("http://localhost:5000/auth/getVendorsList"));

//getVendorsList

/// get Admin Orders
export const getAdminOrders = (values) =>(axios.post("http://localhost:5000/cart/getAdminOrders",values));

// getting order History for admin
export const getAdminOrdersHistory = (values) =>(axios.post("http://localhost:5000/cart/getAdminOrdersHistory",values));


///////////

export const getAllProducts = () =>(axios.get("http://localhost:5000/product/getAllProducts"));

export const deleteProduct = (id) =>(axios.delete(`http://localhost:5000/product/deleteProduct/${id}`))

export const getProduct = (id) =>(axios.get(`http://localhost:5000/product/getProductDetails/${id}`))

export const addToCart = (values) =>(axios.post(`http://localhost:5000/cart/addToCart`,values))

// updateCart
export const  updateCart = (id,values) =>(axios.post(`http://localhost:5000/cart/updateCart/${id}`,values))

//deleteCartItem
export const deleteCartItem = (id) =>(axios.delete(`http://localhost:5000/cart/deleteCartItem/${id}`))

// getCartItems
export const getCartItems = (id) =>(axios.get(`http://localhost:5000/cart/getCartItems/${id}`))

// PlaceOrders
export const PlaceOrders = (id,values) =>(axios.post(`http://localhost:5000/cart/PlaceOrders/${id}`,values))

///getOrders
export const getOrders = (id) =>(axios.get(`http://localhost:5000/cart/getOrders/${id}`))

///update order status
export const updateOrderStatus = (id,values) =>(axios.post(`http://localhost:5000/cart/updateOrderStatus/${id}`,values))

export const updateUser =  (id,values) =>(
    axios.post(`http://localhost:5000/auth/update/${id}`,values)
    );


    // createProduct 
export const createProduct = (values) =>(axios.post(`http://localhost:5000/product/createProduct`,values))


export const getVendorOrders = (values) =>(axios.post(`http://localhost:5000/cart/getVendorOrders`,values))


export const updateProduct = (id,values) =>(axios.post(`http://localhost:5000/product/updateProduct/${id}`,values))


// getOrderHistory
// getHistory
export const getHistory = (values) =>(axios.post(`http://localhost:5000/cart/getHistory`,values))

/// const get Admin Id 
export const getAdminId = ()=>(axios.get(`http://localhost:5000/auth/getAdminId`))

/// send Message
export const sendMessage = (values)=>(axios.post("http://localhost:5000/chat/sendMessage",values))

/// get chat
export const getMessages = (id)=>(axios.get(`http://localhost:5000/chat/getMessages/${id}`))

/// get users list 
export const getUsers = ()=>(axios.get("http://localhost:5000/chat/getAllUsers"));


export const updateProductOrders = (values)=>(axios.post(`http://localhost:5000/product/updateProductOrders`,values))

export const getProductTotalSales =(values)=>(axios.post(`http://localhost:5000/cart/getProductTotalSales`,values))

export const reduceProductOrder =(values)=>(axios.post(`http://localhost:5000/product/reduceProductOrder`,values))