import React, { useEffect, useState } from 'react'
import { getVendorsList } from '../utils/utils';
import Vendor from './Vendor';

const VendorList = () => {
    const [list,setList] = useState([]);
    const [click,setClick] = useState([]);

    useEffect(()=>{
        const get=async()=>{
            try {
                const res = await getVendorsList();
                setList(res.data);
                console.log(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        get();
    },[click]);

  return (
    <div className='vendorContainer'>
        <h1>Vendors List</h1>
        <div className="list">
            {
                list?.map((ele,ind)=>{
                    return <Vendor state={ele} key={ind} i={ind} st={{click,setClick}}/>
                })
            }
        </div>
    </div>
  )
}

export default VendorList