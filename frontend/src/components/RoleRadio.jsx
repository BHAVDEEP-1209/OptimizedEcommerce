import { Radio } from 'antd';
import { useState } from 'react';

const RoleRadio = (props) => {
  const [value, setValue] = useState(props.state.formValues.role);
  const onChange = (e) => {
   setValue(e.target.value);
   
   props.state.setFormValues(prev =>{
    return {
        ...prev,
        role : e.target.value
    }
   })
  };


  return (
    <Radio.Group onChange={onChange} value={value}>
      <Radio value={"customer"}>Customer</Radio>
      <Radio value={"vendor"}>Vendor</Radio>
      
    </Radio.Group>
  );
};
export default RoleRadio;