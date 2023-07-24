import { Radio } from 'antd';
import { useState } from 'react';

const SavedAs = (props) => {
  const [value, setValue] = useState("");
  const onChange = (e) => {
   setValue(e.target.value);
   props.state.setFormValues(prev =>{
    return {
      ...prev,
      "savedAs" : e.target.value,
    }
   });
  };



  return (
    <Radio.Group onChange={onChange} value={value}>
      <Radio value={"product"}>Product</Radio>
      <Radio value={"draft"}>Draft</Radio>
      
    </Radio.Group>
  );
}; 
export default SavedAs;