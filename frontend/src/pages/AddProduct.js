import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import "../Styles/AddProduct.scss"
import { addProduct, createProduct, getProduct, updateProduct } from '../utils/utils'
import axios from 'axios'
import Category from '../components/Category'
import SavedAs from '../components/SavedAs'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Loader from "../components/Loader"
import { Button, notification, Space } from 'antd';

const AddProduct = () => {

  const {id} = useParams();

  const [loading,setLoading] = useState(false);

    ////////////////////notification
    const [api, contextHolder] = notification.useNotification();
    let msg = useState("");
    const openNotificationWithIcon = (type) => {
      api[type]({
        message: msg,    
      });
    };
    //////////////////////////

  const user = useSelector(state=>state?.currentUser);
  const initial = {category : "watches" , savedAs : "product" ,name : "" , description : "", price : "", stock : "" , uploadedBy : user?.email , uploadedByName : user?.name}
  const [formValues,setFormValues] = useState(initial);
  const baseImgUrl = `http://localhost:5000/images/`
  const navigate = useNavigate();

    // validation fields
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    /////////// for add product !

  const handleChange = (e)=>{
    const {name,value} = e.target;
   
    setFormErrors(prev=>{
      return {
        ...prev,
        [name] : ""
      }
    })


      setFormValues((prev)=>{
        return {
          ...prev,
          [name] : value
        }
      })
    
  }


   // validation
   const validate = (values) => {
    const errors = {};
    let re=/^-?[0-9]+$/;
    const len = values.name.trim().length;
    const desLength = values.description.trim().length;

    if (!values.name.trim()) {
      errors.name = "Product Name required!";
    }else if(len>15){
      errors.name = "Product Name Too Long!";
    }
    if (!values.description.trim()) {
      errors.description = "Write Product Description!";
    }else if(desLength>50){
      errors.description = "Description Tool Long!";
    }if (!values.price) {
      errors.price = "Enter Price!";
    }else if(values.price>=1000000){
      errors.price = "Price too High : Invalid Amount!"
    }else if(!re.test(values?.price)){
      errors.price = "Invalid Amount!"
    }else if(values.price<0){
      errors.price = "Invalid Amount : Price Cannot Be Negative!"
    }
    if(!values.stock){
      errors.stock="Enter the stock of Product!"
    }else if(!re.test(values.stock)){
      errors.stock="Invalid No Of Stock!"
    }
    else if(values.stock<0){
      errors.stock="Stock No cannot be negative!"
    }else if(values.stock.length>8){
      errors.stock="Invalid No Of Stock: Stock Amount Too Big!"
    }
    if(!values.images?.length){
      errors.images = "Upload 4 Product Images!";
    }else if(values.images.length!=4){
      errors.images = "Upload 4 Product Images!";
    }
    
    
    if (Object.keys(errors).length != 0) {
      setLoading(false);
    }
    return errors;
  };

  


  const handleFileChange = (e)=>{
    const {name,value} = e.target;

    setFormErrors(prev=>{
      return {
        ...prev,
        [name] : ""
      }
    })
    const files = e.target.files;
    let formData = new FormData();
    {
      for(let i=0;i<files.length;i++){
        formData.append("images",files[i]);
      }
    }
    axios({
      method: "post",
      url: `http://localhost:5000/product/productImage/`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        setFormValues(prev=>{
          return {
            ...prev,
            images : response.data
          }
        })
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });


  }

  useEffect(()=>{
    if(id!=undefined){
      const getData=async()=>{
        try {
         const product = await getProduct(id);
         setFormValues(product.data);
        } catch (error) {
         console.log(error);
        }
       }
       getData();
    }
  },[])

/////////////////// for form Errors
  useEffect(() => {
    const addProduct = async () => {
      try {
     if(!id){
      const res = await createProduct(formValues);
      msg = "Product Added!"
      openNotificationWithIcon('success')

      setLoading(false);

      setTimeout(()=>{
        setFormValues(initial)
        navigate("/homepage")
      },500)
      
     }else{
      const res = await updateProduct(id,{formValues});

      msg = "Item Updated!"
      openNotificationWithIcon('success')

      setLoading(false);

      setTimeout(()=>{
        navigate("/profile/store");
      },500)
     }

     

      } catch (error) {

        setLoading(false);
        console.log(error);
      }
    };
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      addProduct();
    }
    // setLoading(false);
  }, [formErrors]);




  const handleEdit=async(e)=>{
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updateProduct(id,{formValues});

      msg = "Item Updated!"
      openNotificationWithIcon('success')

      setLoading(false);

      setTimeout(()=>{
        navigate("/profile/store");
      },500)

    } catch (error) {

      setLoading(false);
      console.log(error);
    }
    
  }

  const formSubmit=(e)=>{
    if(id!=undefined && formValues?.savedAs=="draft"){
      handleEdit(e);
    }else{
      handleSubmit(e);
    }
  }


  const handleSubmit =async(e)=>{
    e.preventDefault();
    setLoading(true);
    
    {
      (id==undefined ) && setFormErrors(validate(formValues));
    }
    {
      (id && formValues?.savedAs=="product" ) && setFormErrors(validate(formValues));
    }
    
    setIsSubmit(true); 
  }

  return (
    <>
    {contextHolder}
      <Navbar />
    <div className='productForm'>
      <form onSubmit={formSubmit}>
        <input type="text" name="name" id="" placeholder='Name' value={formValues?.name} onChange={handleChange} />
        <p className='error'>{formErrors?.name}</p>
        <input type="text" name="description" id="" placeholder='Description' value={formValues?.description} onChange={handleChange}/>
        <p className='error'>{formErrors?.description}</p>
        <input type="number" name="price" id="" placeholder='Price' value={formValues?.price} onChange={handleChange} />
        <p className='error'>{formErrors?.price}</p>
        <input type="number" name="stock" id="" placeholder='Stock' value={formValues?.stock} onChange={handleChange}/>
        <p className='error'>{formErrors?.stock}</p>
        <label htmlFor='image'><UploadFileIcon /> Upload 4 Product Pictures </label>
        <input type="file" name="images" multiple style={{display : "none"}} id="image" onChange={handleFileChange}/>
        <p className='error'>{formErrors?.images}</p>
        
       <div className="category">
       <span className='h1'>Select Category:</span>
        <Category state={{formValues,setFormValues}} />
        <span className='h2'>{formValues?.category}</span>
       </div>
        <hr />

       <div className='saveAs'>
       <span className='h1'>Save As:</span>
        <span className='h2'>{formValues?.savedAs}</span>
       </div>
        <SavedAs state={{formValues,setFormValues}}/>
        {
          loading ? <Loader /> : <button type="submit">{id!=undefined ? "Edit" : "Submit"}</button>
        }
      </form>

      <div className="imagesPreview">
        {
          formValues?.images!=undefined ? <>
          {
            formValues?.images.map((p)=>{
              return <img src={baseImgUrl+`${p}`} alt="" />
            })
          }
          </>
          :
          <>
           
            <img src="https://www.cureuppharma.in/wp-content/uploads/2018/06/dummy.jpg" alt="" />
            <img src="https://www.cureuppharma.in/wp-content/uploads/2018/06/dummy.jpg" alt="" />
            <img src="https://www.cureuppharma.in/wp-content/uploads/2018/06/dummy.jpg" alt="" />
            <img src="https://www.cureuppharma.in/wp-content/uploads/2018/06/dummy.jpg" alt="" />
            </>
           
        }
      </div>
    </div>
    </>
  )
}

export default AddProduct