import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import "../Styles/AddProduct.scss"
import { createProduct, getProduct, updateProduct } from '../service/service.js'
import axios from 'axios'
import Category from '../components/Category'
import SavedAs from '../components/SavedAs'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Loader from "../components/Loader"
import { notification } from 'antd';
import { baseImgUrl , validateAddProduct} from '../utils/utils'

const AddProduct = () => {

  const {id} = useParams();
  const [loading,setLoading] = useState(false);
  const user = useSelector(state=>state?.currentUser);
  const initial = {category : "watches" , savedAs : "product" ,name : "" , description : "", price : "", stock : "" , uploadedBy : user?.email , uploadedByName : user?.name}
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [formValues,setFormValues] = useState(initial);
  const navigate = useNavigate();

    ////////////////////notification
    const [api, contextHolder] = notification.useNotification();
    let msg = useState("");
    const openNotificationWithIcon = (type) => {
      api[type]({
        message: msg,    
      });
    };
    //////////////////////////

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
      (id==undefined ) && setFormErrors(validateAddProduct(formValues));
    }
    {
      (id && formValues?.savedAs=="product" ) && setFormErrors(validateAddProduct(formValues));
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