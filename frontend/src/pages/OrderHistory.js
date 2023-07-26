import React, { useEffect, useState } from 'react'
import { getAdminOrdersHistory, getHistory } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Empty } from 'antd';
import OrderItem from '../components/OrderItem';

const OrderHistory = () => {
    const [items, setItems] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.currentUser);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setTotal(0);
        const get = async () => {
            try {
                /// testing for vendor orders history
                // if (user.role == "vendor") {
                //     const res = await getHistory({ email: user.email });
                //     setItems(res.data);
                //     let t = 0;
                //     {
                //         res.data?.map((ele) => {
                //             t = t + (Number(ele.product.price) * Number(ele.quantity));
                //         })
                //     }
                //     setTotal(t);
                // }else{
                //     const res = await getAdminOrdersHistory();
                //     setItems(res.data);
                // }

                const res = await getHistory({ email: user.email });
                setItems(res.data);
                let t = 0;
                {
                    res.data?.map((ele) => {
                        if(ele.discount==0){
                            t = t + (Number(ele.product.price) * Number(ele.quantity));
                        }else{
                            t = t + ele.discount;
                        }
                    })
                }
                setTotal(t);

            } catch (error) {
                console.log(error);
            }
        }
        get();
    }, [])
    return (
        <div className='order'>
            <div className="top">
                <h1 className='heading'>History</h1>
                <div className='subTop'>
                    {
                        <div className="earnings">
                            <span>Orders: {items.length}</span>
                        </div>
                    }
                    {/* {
                    user?.role == "vendor" && <div className="earnings">
                        &#x20B9;<span>{total}.00</span>&#x2191;
                    </div>
                } */}

                    {/* testing for vendor only  */}

                    {
                        <div className="earnings">
                            &#x20B9;<span>{total}.00</span>&#x2191;
                        </div>
                    }

                </div>
            </div>
            <div className="items">
                {
                    items?.map((ele, ind) => {
                        return <OrderItem state={ele} key={ind} />
                    })
                }
            </div>
            {
                !items.length && <Empty />
            }
        </div>
    )
}

export default OrderHistory