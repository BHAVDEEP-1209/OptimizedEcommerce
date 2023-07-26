import React, { useEffect } from 'react';
import { Select, Space } from 'antd';

const Category = (props) => {
  const value = "";
    const handleChange = (value) => {
      props.state.setFormValues(prev =>{
        return {
          ...prev,
          "category" : value,
        }
       });
      };

     
  return (
    <Space wrap>
    <Select
      defaultValue={value}
      style={{
        width: 120,
        marginRight : "20px",
        marginLeft : "10px"
      }}
      onChange={handleChange}
      options={[
        {
          value: 'watches',
          label: 'Watches',
        },
        {
          value: 'makeUp',
          label: 'Make Up',
        },
        {
          value: 'jewelry',
          label: 'Jewelry',
        },
        {
          value: 'skincare',
          label: 'Skincare',
        },
        {
          value: 'fashion',
          label: 'Fashion',
        },
      ]}
    />
    
  </Space>
  )
    };
export default Category;